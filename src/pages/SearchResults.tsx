import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdvancedSearchBar from '../components/common/AdvancedSearchBar';
import PostList from '../pages/PostList';
import queryString from 'query-string';
import { FirestoreDocument } from '../hook/usePaginationData';
// import { ListContainer, ItemContainer, PostTitle, PostPreview, Info } from '../assets/styles/ListLayout';
// import { Link } from 'react-router-dom';

const SearchResults: React.FC = () => {
    const location = useLocation();
    const {
        q: initialSearchTerm,
        field: initialSearchField,
        region,
        subregion,
        theme,
        subtheme,
    } = queryString.parse(location.search);

    const [searchTerm, setSearchTerm] = useState((initialSearchTerm as string) || '');
    const [selectedRegion, setSelectedRegion] = useState((region as string) || '');
    const [selectedSubregion, setSelectedSubregion] = useState((subregion as string) || '');
    const [selectedTheme, setSelectedTheme] = useState((theme as string) || '');
    const [selectedSubtheme, setSelectedSubtheme] = useState((subtheme as string) || '');
    const [searchField, setSearchField] = useState<keyof FirestoreDocument | 'all'>(
        (initialSearchField as keyof FirestoreDocument) || 'all',
    );

    const handleSearch = (
        searchTerm: string,
        region: string,
        subregion: string,
        theme: string,
        subtheme: string,
        searchField: keyof FirestoreDocument | 'all',
    ) => {
        setSearchTerm(searchTerm);
        setSelectedRegion(region);
        setSelectedSubregion(subregion);
        setSelectedTheme(theme);
        setSelectedSubtheme(subtheme);
        setSearchField(searchField);
    };

    useEffect(() => {
        setSearchTerm((initialSearchTerm as string) || '');
        setSelectedRegion((region as string) || '');
        setSelectedSubregion((subregion as string) || '');
        setSelectedTheme((theme as string) || '');
        setSelectedSubtheme((subtheme as string) || '');
        setSearchField((initialSearchField as keyof FirestoreDocument | 'all') || 'all');
    }, [initialSearchTerm, initialSearchField, region, subregion, theme, subtheme]);

    return (
        <div>
            <AdvancedSearchBar
                onSearch={handleSearch}
                initialSearchTerm={searchTerm}
                initialRegion={selectedRegion}
                initialSubregion={selectedSubregion}
                initialTheme={selectedTheme}
                initialSubtheme={selectedSubtheme}
                initialSearchField={searchField}
            />
            <PostList
                searchTerm={searchTerm}
                selectedCategory1={selectedRegion}
                selectedSubcategory1={selectedSubregion}
                selectedCategory2={selectedTheme}
                selectedSubcategory2={selectedSubtheme}
                searchField={searchField}
            />
        </div>
    );
};

export default SearchResults;
