import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import buildQuery from '../components/Pagination/buildQuery';
import postsData from '../mockData/posts.json';

interface Filter {
    field: keyof FirestoreDocument;
    value: string;
}

interface UsePaginatedDataProps {
    collectionName: string;
    fieldFilters?: Filter[];
    itemsPerPage: number;
}

export interface FirestoreDocument {
    id: string;
    title: string;
    content: string;
    region: string;
    subregion: string;
    theme: string;
    subtheme: string;
    createdAt?: Date;
}

const usePaginationData = <T extends FirestoreDocument>({
    collectionName,
    fieldFilters = [],
    itemsPerPage,
}: UsePaginatedDataProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [useLocalData, setUseLocalData] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const filterLocalData = useCallback(() => {
        let filteredData = postsData as T[];
        fieldFilters.forEach((filter) => {
            filteredData = filteredData.filter((item) => String(item[filter.field]).includes(filter.value));
        });
        return filteredData;
    }, [fieldFilters]);

    const fetchTotalItems = useCallback(async () => {
        if (useLocalData) {
            const filteredData = filterLocalData();
            return Math.ceil(filteredData.length / itemsPerPage);
        }
        const q = buildQuery(collectionName, fieldFilters, 'createdAt', 1000, null);
        const querySnapshot = await getDocs(q);
        return Math.ceil(querySnapshot.size / itemsPerPage);
    }, [collectionName, fieldFilters, itemsPerPage, useLocalData, filterLocalData]);

    const fetchPageData = useCallback(async () => {
        if (useLocalData) {
            const filteredData = filterLocalData();
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return filteredData.slice(startIndex, endIndex);
        }
        const q = buildQuery(collectionName, fieldFilters, 'createdAt', itemsPerPage, lastDoc);
        const querySnapshot = await getDocs(q);
        const fetchedData: T[] = querySnapshot.docs.map(
            (doc) =>
                ({
                    id: doc.id,
                    ...doc.data(),
                }) as T,
        );
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
        return fetchedData;
    }, [collectionName, fieldFilters, itemsPerPage, lastDoc, useLocalData, filterLocalData, currentPage]);

    const {
        data: totalPages,
        isLoading: isTotalLoading,
        error: totalError,
    } = useQuery(['totalPages', collectionName, fieldFilters, useLocalData], fetchTotalItems, { staleTime: Infinity });

    const {
        data: posts,
        isLoading: isPostsLoading,
        error: postsError,
        refetch,
    } = useQuery(['posts', collectionName, fieldFilters, currentPage, useLocalData], fetchPageData, {
        keepPreviousData: true,
    });
    useEffect(() => {
        if (totalError || postsError) {
            const errorMessage = (error: unknown): string => {
                if (error instanceof Error) return error.message;
                return String(error);
            };
            const totalErrorMessage = totalError ? errorMessage(totalError) : '';
            const postsErrorMessage = postsError ? errorMessage(postsError) : '';
            if (totalErrorMessage.includes('Quota exceeded') || postsErrorMessage.includes('Quota exceeded')) {
                setUseLocalData(true);
            }
        }
    }, [totalError, postsError]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setLastDoc(null); //페이지 변경시 lastDoc 초기화
        queryClient.invalidateQueries(['posts']);
        refetch();
    };

    return {
        data: posts || [],
        loading: isTotalLoading || isPostsLoading,
        totalPages: totalPages || 0,
        currentPage,
        handlePageChange,
        error: totalError || postsError,
    };
};

export default usePaginationData;
