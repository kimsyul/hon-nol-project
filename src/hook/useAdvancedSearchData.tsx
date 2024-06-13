import { useState, useEffect, useCallback } from 'react';
import { getDocs } from 'firebase/firestore';
import buildQuery from '../components/Pagination/buildQuery';
import { FirestoreDocument } from './usePaginationData';

interface Filter {
    field: keyof FirestoreDocument;
    value: string;
}

interface UseAdvancedSearchDataProps {
    searchTerm: string;
    searchField: keyof FirestoreDocument | 'all';
    selectedCategory1?: string;
    selectedSubcategory1?: string;
    selectedCategory2?: string;
    selectedSubcategory2?: string;
}

const useAdvancedSearchData = ({
    searchTerm,
    searchField,
    selectedCategory1,
    selectedSubcategory1,
    selectedCategory2,
    selectedSubcategory2,
}: UseAdvancedSearchDataProps) => {
    const [filteredData, setFilteredData] = useState<FirestoreDocument[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAdvancedSearchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const filters: Filter[] = [];
            if (selectedCategory1) filters.push({ field: 'region', value: selectedCategory1 });
            if (selectedSubcategory1) filters.push({ field: 'subregion', value: selectedSubcategory1 });
            if (selectedCategory2) filters.push({ field: 'theme', value: selectedCategory2 });
            if (selectedSubcategory2) filters.push({ field: 'subtheme', value: selectedSubcategory2 });
            if (searchField !== 'all') filters.push({ field: searchField, value: searchTerm });

            const q = buildQuery('posts', filters, 'createdAt', 1000, null);
            const querySnapshot = await getDocs(q);
            const fetchedData: FirestoreDocument[] = querySnapshot.docs.map(
                (doc) =>
                    ({
                        id: doc.id,
                        ...doc.data(),
                    }) as FirestoreDocument,
            );
            setFilteredData(fetchedData);
        } catch (error) {
            console.error('검색 데이터를 가져오는 중 오류 발생:', error);
            setError('검색 데이터를 가져오는 중 오류 발생');
        } finally {
            setLoading(false);
        }
    }, [searchTerm, searchField, selectedCategory1, selectedSubcategory1, selectedCategory2, selectedSubcategory2]);

    useEffect(() => {
        fetchAdvancedSearchData();
    }, [fetchAdvancedSearchData]);

    return { filteredData, loading, error };
};

export default useAdvancedSearchData;
