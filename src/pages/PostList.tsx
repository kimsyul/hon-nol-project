import { ListContainer, ItemContainer, PostTitle, PostPreview, Info } from '../assets/styles/ListLayout';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    DocumentData,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { usePaginationData, FirestoreDocument } from '../components/Pagination/usePaginationData';
import Pagination from '../components/Pagination/Pagination';
import { categories } from '../categoryList';

interface Post extends FirestoreDocument {
    id: string;
    title: string;
    content: string;
    region: string;
    subregion: string;
    theme: string;
    subtheme: string;
}

const postsPerPage = 5;

const PostList: React.FC = () => {
    const { regionId, subregionId, themeId, subthemeId } = useParams<{
        regionId?: string;
        subregionId?: string;
        themeId?: string;
        subthemeId?: string;
    }>();
    const fieldFilters = [];
    if (regionId) fieldFilters.push({ field: 'region', value: regionId });
    if (subregionId) fieldFilters.push({ field: 'subregion', value: subregionId });
    if (themeId) fieldFilters.push({ field: 'theme', value: themeId });
    if (subthemeId) fieldFilters.push({ field: 'subtheme', value: subthemeId });

    const {
        data: posts,
        loading,
        totalPages,
        currentPage,
        handlePageChange,
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

    if (loading) return <span className="loading loading-ring loading-lg"></span>;

    return (
        <>
            <ListContainer>
                {posts.map((post, index) => {
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
                })}
            </ListContainer>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
    );
};

export default PostList;
