import { useState, useEffect, useCallback } from 'react';
import postsData from '../mockData/posts.json';
import { FirestoreDocument } from './usePaginationData';

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

    const filterData = useCallback(() => {
        let data = postsData as FirestoreDocument[];
        if (selectedCategory1) data = data.filter((item) => item.region === selectedCategory1);
        if (selectedSubcategory1) data = data.filter((item) => item.subregion === selectedSubcategory1);
        if (selectedCategory2) data = data.filter((item) => item.theme === selectedCategory2);
        if (selectedSubcategory2) data = data.filter((item) => item.subtheme === selectedSubcategory2);
        if (searchField === 'all') {
            data = data.filter((item) => item.title.includes(searchTerm) || item.content.includes(searchTerm));
        } else {
            data = data.filter((item) => String(item[searchField]).includes(searchTerm));
        }
        setFilteredData(data);
    }, [searchTerm, searchField, selectedCategory1, selectedSubcategory1, selectedCategory2, selectedSubcategory2]);

    useEffect(() => {
        filterData();
    }, [filterData]);

    return { filteredData };
};

export default useAdvancedSearchData;
