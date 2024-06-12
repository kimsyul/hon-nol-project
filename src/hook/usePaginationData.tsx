import { useState, useEffect, useCallback } from 'react';
import { getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import buildQuery from '../components/Pagination/buildQuery';
import postsData from '../mockData/posts.json';
import { FirebaseError } from 'firebase/app';

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
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [useLocalData, setUseLocalData] = useState<boolean>(false);

    const filterLocalData = useCallback(() => {
        let filteredData = postsData as T[];
        fieldFilters.forEach((filter) => {
            filteredData = filteredData.filter((item) => String(item[filter.field]).includes(filter.value));
        });
        return filteredData;
    }, [fieldFilters]);

    const fetchTotalItems = useCallback(async () => {
        setLoading(true);
        try {
            if (useLocalData) {
                const filteredData = filterLocalData();
                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
            } else {
                const q = buildQuery(collectionName, fieldFilters, 'createdAt', 1000, null);
                const querySnapshot = await getDocs(q);
                setTotalPages(Math.ceil(querySnapshot.size / itemsPerPage));
            }
        } catch (error) {
            if (error instanceof FirebaseError && error.code === 'resource-exhausted') {
                console.error('할당량 초과, 로컬 데이터를 사용합니다.', error);
                setUseLocalData(true);
                const filteredData = filterLocalData();
                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    }, [collectionName, fieldFilters, itemsPerPage, useLocalData, filterLocalData]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (useLocalData) {
                const filteredData = filterLocalData();
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                setData(filteredData.slice(startIndex, endIndex));
            } else {
                const q = buildQuery(collectionName, fieldFilters, 'createdAt', itemsPerPage, lastDoc);
                const querySnapshot = await getDocs(q);
                const fetchedData: T[] = querySnapshot.docs.map(
                    (doc) =>
                        ({
                            id: doc.id,
                            ...doc.data(),
                        }) as T,
                );
                setData((prevData) => (currentPage === 1 ? fetchedData : [...prevData, ...fetchedData]));
                setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
            }
        } catch (error) {
            if (error instanceof FirebaseError && error.code === 'resource-exhausted') {
                console.error('할당량 초과, 로컬 데이터를 사용합니다.', error);
                setUseLocalData(true);
                fetchTotalItems();
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    }, [
        collectionName,
        fieldFilters,
        itemsPerPage,
        lastDoc,
        currentPage,
        useLocalData,
        filterLocalData,
        fetchTotalItems,
    ]);

    useEffect(() => {
        fetchTotalItems();
    }, [fetchTotalItems]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (currentPage > 1) {
            fetchData();
        }
    }, [currentPage, fetchData]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        if (newPage === 1) {
            setLastDoc(null);
            setData([]);
        }
    };

    return { data, loading, totalPages, currentPage, handlePageChange };
};

export default usePaginationData;
