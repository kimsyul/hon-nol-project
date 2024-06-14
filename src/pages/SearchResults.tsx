import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdvancedSearchBar from '../components/common/AdvancedSearchBar';
import useAdvancedSearchData from '../hook/useAdvancedSearchData';
import queryString from 'query-string';
import { FirestoreDocument } from '../hook/usePaginationData';
import { ListContainer, ItemContainer, PostTitle, PostPreview, Info } from '../assets/styles/ListLayout';
import { Container, Message } from '../pages/PostList';
import { Link } from 'react-router-dom';

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
    const [searchField, setSearchField] = useState(initialSearchField as keyof FirestoreDocument | 'all');

    const { filteredData, loading, error } = useAdvancedSearchData({
        searchTerm,
        searchField,
        selectedCategory1: selectedRegion,
        selectedSubcategory1: selectedSubregion,
        selectedCategory2: selectedTheme,
        selectedSubcategory2: selectedSubtheme,
    });

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
        if (initialSearchTerm) {
            setSearchTerm(initialSearchTerm as string);
        }

        if (initialSearchField) {
            setSearchField(initialSearchField as keyof FirestoreDocument);
        }

        if (region) {
            setSelectedRegion(region as string);
        }

        if (subregion) {
            setSelectedSubregion(subregion as string);
        }
        if (theme) {
            setSelectedTheme(theme as string);
        }
        if (subtheme) {
            setSelectedSubtheme(subtheme as string);
        }
    }, [initialSearchField, initialSearchTerm, region, subregion, theme, subtheme]);

    if (loading) {
        return (
            <Container>
                <span className="loading loading-ring loading-lg"></span>
            </Container>
        );
    }
    if (error) {
        return (
            <Container>
                <Message>오류가 발생했습니다. 다시 시도해 주세요.</Message>
            </Container>
        );
    }

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
            <ListContainer>
                {filteredData.length === 0 ? (
                    <Container>
                        <Message>게시글이 없습니다.ㅠ_ㅠ</Message>
                    </Container>
                ) : (
                    filteredData.map((post, index) => (
                        <ItemContainer key={`${post.id}-${index}`}>
                            <Link to={`/posts/${post.id}`}>
                                <PostTitle>{post.title}</PostTitle>
                                <PostPreview>{post.content.substring(0, 100)}...</PostPreview>
                                <Info>
                                    {post.region} - {post.subregion} / {post.theme} - {post.subtheme}
                                </Info>
                            </Link>
                        </ItemContainer>
                    ))
                )}
            </ListContainer>
        </div>
    );
};

export default SearchResults;
