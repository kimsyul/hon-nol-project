import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import DOMPurify from 'dompurify';
import CommentForm from '../components/common/CommentForm';
import CommentsList from '../components/common/CommentsList';

interface Post {
    title: string;
    content: string;
}

const PostDetail: React.FC = () => {
    const { postId } = useParams<{ postId?: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) {
                console.log('No postId provieded');
                navigate('/');
                return;
            }

            try {
                const docRef = doc(db, 'posts', postId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const safeHTML = DOMPurify.sanitize(docSnap.data().content, { USE_PROFILES: { html: true } });
                    setPost({
                        title: docSnap.data().title,
                        content: safeHTML,
                    });
                } else {
                    console.log('No such document!');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching post: ', error);
                navigate('/');
            }
        };
        fetchPost();
    }, [postId, navigate]);

    if (!post) return <span className="loading loading-ring loading-lg"></span>;

    return (
        <Container>
            <Title>{post?.title}</Title>
            <Content dangerouslySetInnerHTML={{ __html: post.content }} />
            {postId ? (
                <>
                    <CommentsList postId={postId} />
                    <CommentForm postId={postId} />
                </>
            ) : null}
        </Container>
    );
};

export default PostDetail;

const Container = styled.div`
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

const Title = styled.h1`
    font-size: 30px;
    font-weight: bold;
    margin-top: 30px;
`;

const Content = styled.div`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;
`;
