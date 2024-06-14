import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import buildQuery from '../components/Pagination/buildQuery';
import postsData from '../mockData/posts.json';

interface UsePaginatedDataProps {
    collectionName: string;
    searchTerm?: string;
    fieldFilters?: { field: keyof FirestoreDocument; value: string }[];
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
    searchTerm = '',
    fieldFilters = [],
    itemsPerPage,
}: UsePaginatedDataProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastDocs, setLastDocs] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [useLocalData, setUseLocalData] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const filterLocalData = useCallback(() => {
        let filteredData = postsData as T[];
        fieldFilters.forEach((filter) => {
            filteredData = filteredData.filter((item) => String(item[filter.field]).includes(filter.value));
        });

        if (searchTerm) {
            filteredData = filteredData.filter(
                (item) =>
                    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.content.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }
        return filteredData;
    }, [fieldFilters, searchTerm]);

    const fetchTotalItems = useCallback(async () => {
        if (useLocalData) {
            const filteredData = filterLocalData();
            return Math.ceil(filteredData.length / itemsPerPage);
        }
        const q = buildQuery(collectionName, searchTerm, 'createdAt', 1000, null);
        const querySnapshot = await getDocs(q);
        return Math.ceil(querySnapshot.size / itemsPerPage);
    }, [collectionName, searchTerm, itemsPerPage, useLocalData, filterLocalData]);

    const fetchPageData = useCallback(async () => {
        if (useLocalData) {
            const filteredData = filterLocalData();
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return filteredData.slice(startIndex, endIndex);
        }
        const lastDoc = lastDocs[currentPage - 2] || null;
        const q = buildQuery(collectionName, searchTerm, 'createdAt', itemsPerPage, lastDoc);
        const querySnapshot = await getDocs(q);
        const fetchedData: T[] = querySnapshot.docs.map(
            (doc) =>
                ({
                    id: doc.id,
                    ...doc.data(),
                }) as T,
        );
        if (querySnapshot.docs.length > 0) {
            setLastDocs((prev) => {
                const newLastDocs = [...prev];
                newLastDocs[currentPage - 1] = querySnapshot.docs[querySnapshot.docs.length - 1];
                return newLastDocs;
            });
        }
        return fetchedData;
    }, [collectionName, searchTerm, itemsPerPage, lastDocs, useLocalData, filterLocalData, currentPage]);
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
        useLocalData,
    };
};

export default usePaginationData;
