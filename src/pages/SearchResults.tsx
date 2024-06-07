import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdvancedSearchBar from '../components/common/AdvancedSearchBar';
import PostList from './PostList';
import queryString from 'query-string';

const SearchResults: React.FC = () => {
    const location = useLocation();
    const { q: initialSearchTerm, field: initialSearchField } = queryString.parse(location.search);

    const [searchTerm, setSearchTerm] = useState((initialSearchTerm as string) || '');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [searchField, setSearchField] = useState((initialSearchField as string) || 'all');

    const handleSearch = (searchTerm: string, category: string, subcategory: string, searchField: string) => {
        setSearchTerm(searchTerm);
        setSelectedCategory(category);
        setSelectedSubcategory(subcategory);
        setSearchField(searchField);
    };

    useEffect(() => {
        if (initialSearchTerm) {
            setSearchTerm(initialSearchTerm as string);
        }

        if (initialSearchField) {
            setSearchField(initialSearchField as string);
        }
    }, [initialSearchField, initialSearchTerm]);

    return (
        <div>
            <AdvancedSearchBar
                onSearch={handleSearch}
                initialSearchTerm={searchTerm}
                initialCategory={selectedCategory}
                initialSubcategory={selectedSubcategory}
                initialSearchField={searchField}
            />
            <PostList
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                searchField={searchField}
            />
        </div>
    );
};

export default SearchResults;
