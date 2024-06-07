import { useState, useEffect, useCallback } from 'react';
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
import { FirebaseError } from 'firebase/app';
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
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

    const buildQuery = useCallback(
        (isTotalItemsQuery: boolean) => {
            let q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
            fieldFilters.forEach((filter) => {
                if (filter.field === 'searchTerm') {
                    const searchTerm = filter.value.toLowerCase();
                    q = query(q, where('title', '>=', searchTerm), where('title', '<=', searchTerm + '\uf8ff'));
                    if (!isTotalItemsQuery) {
                        q = query(q, where('content', '>=', searchTerm), where('content', '<=', searchTerm + '\uf8ff'));
                    }
                } else {
                    q = query(q, where(filter.field, '==', filter.value));
                }
            });
            return q;
        },
        [collectionName, fieldFilters],
    );

    const fetchTotalItems = useCallback(async () => {
        setLoading(true);
        const q = buildQuery(true);
        try {
            const querySnapshot = await getDocs(q);
            setTotalPages(Math.ceil(querySnapshot.size / itemsPerPage));
        } catch (error) {
            if (error instanceof FirebaseError && error.code === 'resource-exhausted') {
                setQuotaExceeded(true);
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    }, [buildQuery, itemsPerPage]);

    const fetchData = useCallback(
        async (newPage: number) => {
            setLoading(true);
            let q = buildQuery(false);
            if (newPage > 1 && lastDoc) {
                q = query(q, startAfter(lastDoc));
            }
            q = query(q, limit(itemsPerPage));
            try {
                const querySnapshot = await getDocs(q);
                const fetchedData: T[] = querySnapshot.docs.map(
                    (doc) =>
                        ({
                            id: doc.id,
                            ...doc.data(),
                        }) as T,
                );
                setData(fetchedData);
                setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
            } catch (error) {
                if (error instanceof FirebaseError && error.code === 'resource-exhausted') {
                    setQuotaExceeded(true);
                } else {
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        },
        [buildQuery, itemsPerPage, lastDoc],
    );

    useEffect(() => {
        if (!quotaExceeded) {
            fetchTotalItems();
        }
    }, [fetchTotalItems, quotaExceeded]);

    useEffect(() => {
        if (!quotaExceeded) {
            fetchData(currentPage);
        }
    }, [fetchData, quotaExceeded, currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage !== currentPage) {
            setCurrentPage(newPage);
        }
    };

    return { data, loading, totalPages, currentPage, handlePageChange, quotaExceeded };
};
