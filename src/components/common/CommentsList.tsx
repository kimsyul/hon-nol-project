import { useEffect, useState } from 'react';
import { db, auth } from '../../firebaseConfig';
import { collection, query, where, orderBy, onSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Comment {
    id: string;
    text: string;
}

interface CommentsListProps {
    postId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (!loading && user) {
            const q = query(
                collection(db, 'posts', postId, 'comments'),
                where('postId', '==', postId),
                orderBy('createdAt', 'desc'),
            );
            const unsubscribe = onSnapshot(
                q,
                (querySnapshot) => {
                    const newComments = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                        id: doc.id,
                        text: doc.data().comment,
                    }));
                    setComments(newComments);
                },
                (error) => {
                    console.error('Error fetching comments: ', error);
                },
            );

            return () => unsubscribe();
        }
    }, [user, loading, postId]);

    if (loading) return <span className="loading loading-ring loading-lg"></span>;
    if (error) return <p>Error loading comments: {error.message}</p>;

    return (
        <>
            <Comment>댓글</Comment>
            <CommentListContainer>
                {comments.map((comment: Comment) => (
                    <CommentItem key={comment.id}>
                        <p>{comment.text}</p>
                    </CommentItem>
                ))}
            </CommentListContainer>
        </>
    );
};

export default CommentsList;

const Comment = styled.span`
    font-size: 16px;
    font-weight: bold;
    margin-left: 5px;
    color: #ffabab;
`;

const CommentListContainer = styled.div`
    border-top: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
`;

const CommentItem = styled.div`
    padding: 15px;
    border-bottom: 1px solid #ccc;
    &:last-child {
        border-bottom: none;
    }
    color: black;
`;
