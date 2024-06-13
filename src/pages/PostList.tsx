import { ListContainer, ItemContainer, PostTitle, PostPreview, Info } from '../assets/styles/ListLayout';
import { Link, useParams } from 'react-router-dom';
import usePaginationData, { FirestoreDocument } from '../hook/usePaginationData';
import Pagination from '../components/Pagination/Pagination';
import { categories } from '../categoryList';
import styled from 'styled-components';

interface Post extends FirestoreDocument {
    id: string;
}

interface PostListProps {
    searchTerm?: string;
    selectedCategory1?: string;
    selectedSubcategory1?: string;
    selectedCategory2?: string;
    selectedSubcategory2?: string;
    searchField?: keyof FirestoreDocument | 'all';
}

const postsPerPage = 5;

const PostList: React.FC<PostListProps> = ({
    searchTerm,
    selectedCategory1,
    selectedSubcategory1,
    selectedCategory2,
    selectedSubcategory2,
    searchField = 'all',
}) => {
    const { regionId, subregionId, themeId, subthemeId } = useParams<{
        regionId?: string;
        subregionId?: string;
        themeId?: string;
        subthemeId?: string;
    }>();

    const fieldFilters: { field: keyof FirestoreDocument; value: string }[] = [];
    if (regionId) fieldFilters.push({ field: 'region', value: regionId });
    if (subregionId) fieldFilters.push({ field: 'subregion', value: subregionId });
    if (themeId) fieldFilters.push({ field: 'theme', value: themeId });
    if (subthemeId) fieldFilters.push({ field: 'subtheme', value: subthemeId });
    if (selectedCategory1) fieldFilters.push({ field: 'region', value: selectedCategory1 });
    if (selectedSubcategory1) fieldFilters.push({ field: 'subregion', value: selectedSubcategory1 });
    if (selectedCategory2) fieldFilters.push({ field: 'region', value: selectedCategory2 });
    if (selectedSubcategory2) fieldFilters.push({ field: 'subregion', value: selectedSubcategory2 });
    if (searchTerm) {
        if (searchField === 'all') {
            fieldFilters.push({ field: 'title', value: searchTerm });
            fieldFilters.push({ field: 'content', value: searchTerm });
        } else {
            fieldFilters.push({ field: searchField, value: searchTerm });
        }
    }

    const {
        data: posts,
        loading,
        totalPages,
        currentPage,
        handlePageChange,
        error,
    } = usePaginationData<Post>({
        collectionName: 'posts',
        fieldFilters,
        itemsPerPage: postsPerPage,
    });

    const getCategoryName = (region: string, subregion: string, theme: string, subtheme: string) => {
        const regionName = categories.regions[region]?.name || '';
        const subregionName = categories.regions[region]?.subregions[subregion]?.name || '';
        const themeName = categories.themes[theme]?.name || '';
        const subthemeName = categories.themes[theme]?.subthemes[subtheme]?.name || '';
        return { regionName, subregionName, themeName, subthemeName };
    };

    if (loading)
        return (
            <Container>
                <span className="loading loading-ring loading-lg"></span>
            </Container>
        );

    if (error)
        return (
            <Container>
                <Message>게시글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.</Message>
            </Container>
        );

    return (
        <>
            <ListContainer>
                {posts.length === 0 ? (
                    <Container>
                        <Message>게시글이 없습니다.ㅠ_ㅠ</Message>
                    </Container>
                ) : (
                    posts.map((post, index) => {
                        const { regionName, subregionName, themeName, subthemeName } = getCategoryName(
                            post.region,
                            post.subregion,
                            post.theme,
                            post.subtheme,
                        );

                        return (
                            <ItemContainer key={`${post.id}-${index}`}>
                                <Link to={`/posts/${post.id}`}>
                                    <PostTitle>{post.title}</PostTitle>
                                    <PostPreview>{post.content.substring(0, 100)}...</PostPreview>
                                    <Info>
                                        {regionName} - {subregionName} / {themeName} - {subthemeName}
                                    </Info>
                                </Link>
                            </ItemContainer>
                        );
                    })
                )}
            </ListContainer>
            {posts.length > 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </>
    );
};

export default PostList;

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
`;

export const Message = styled.div`
    font-size: 24px;
    color: #999;
`;
