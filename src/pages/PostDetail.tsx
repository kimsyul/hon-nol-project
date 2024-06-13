import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import CommentForm from '../components/common/CommentForm';
import CommentsList from '../components/common/CommentsList';
import usePaginationData from '../hook/usePaginationData';
import usePostDetail from '../hook/usePostDetail';
import { Container, Message } from './PostList';

const PostDetail: React.FC = () => {
    const { postId } = useParams<{ postId?: string }>();
    const navigate = useNavigate();
    const { useLocalData } = usePaginationData({ collectionName: 'posts', itemsPerPage: 5 }); //usePagination훅에서 useLocal상태 가져옴
    const { data: post, isLoading, error } = usePostDetail(postId!, useLocalData);

    useEffect(() => {
        if (!postId) {
            console.log('No postId provieded');
            navigate('/');
        }
    }, [postId, navigate]);

    if (isLoading) return <span className="loading loading-ring loading-lg"></span>;
    if (error)
        return (
            <Container>
                <Message>게시글을 불러오는 중 오류가 발생했습니다.</Message>
            </Container>
        );
    if (!post)
        return (
            <Container>
                <Message>게시글이 없습니다!</Message>
            </Container>
        );

    return (
        <PostContainer>
            <PostTitle>{post?.title}</PostTitle>
            <PostContent
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content, { USE_PROFILES: { html: true } }) }}
            />
            {postId ? (
                <>
                    <CommentsList postId={postId} />
                    <CommentForm postId={postId} />
                </>
            ) : null}
        </PostContainer>
    );
};

export default PostDetail;

const PostContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 15px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: none;
    border-radius: 4px;
    height: 100vh;
    overflow: auto;
`;

const PostTitle = styled.h1`
    font-size: 30px;
    font-weight: bold;
    margin-top: 30px;
`;

const PostContent = styled.div`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;
`;
