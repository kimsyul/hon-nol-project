import { useState, useEffect } from 'react';
import {
    collection,
    query,
    orderBy,
    limit,
    startAfter,
    where,
    getDocs,
    QueryDocumentSnapshot,
    DocumentData,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';

interface UsePaginatedDataProps {
    collectionName: string;
    fieldFilters?: { field: string; value: string }[];
    itemsPerPage: number;
}

export interface FirestoreDocument extends DocumentData {
    id: string;
}

export const usePaginationData = <T extends FirestoreDocument>({
    collectionName,
    fieldFilters = [],
    itemsPerPage,
}: UsePaginatedDataProps) => {
    const [data, setData] = useState<T[]>([]);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchTotalItems = async () => {
            let q = query(collection(db, collectionName));
            fieldFilters.forEach((filter) => {
                q = query(q, where(filter.field, '==', filter.value));
            });

            const querySnapshot = await getDocs(q);
            setTotalPages(Math.ceil(querySnapshot.size / itemsPerPage));
        };

        fetchTotalItems();
    }, [collectionName, fieldFilters, itemsPerPage]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let q = query(
                collection(db, collectionName),
                ...fieldFilters.map((filter) => where(filter.field, '==', filter.value)),
                orderBy('createdAt', 'desc'),
                limit(itemsPerPage),
            );

            if (lastDoc) {
                q = query(q, startAfter(lastDoc));
            }

            const querySnapshot = await getDocs(q);
            const fetchedData: T[] = querySnapshot.docs.map(
                (doc) =>
                    ({
                        id: doc.id,
                        ...doc.data(),
                    }) as T,
            );

            setData((prevData) => [...prevData, ...fetchedData]);
            setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setLoading(false);
        };
        fetchData();
    }, [collectionName, fieldFilters, itemsPerPage, lastDoc, currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage > currentPage) {
            setLastDoc(data[data.length - 1].createdAt);
        } else {
            setLastDoc(null);
            setData([]);
        }
        setCurrentPage(newPage);
    };
    return { data, loading, totalPages, currentPage, handlePageChange };
};
