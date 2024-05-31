import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import DOMPurify from 'dompurify';

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
        };
        fetchPost();
    }, [postId, navigate]);

    if (!post) return <p>Loading...</p>;

    return (
        <Container>
            <Title>{post?.title}</Title>
            <Content dangerouslySetInnerHTML={{ __html: post.content }} />
        </Container>
    );
};

export default PostDetail;

const Container = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: none;
    border-radius: 4px;
    height: 100vh;
`;

const Title = styled.h1`
    padding: 20px;
    font-size: 30px;
    font-weight: bold;
`;

const Content = styled.div`
    margin-top: 20px;
    border: 1px solid #ccc;
`;
