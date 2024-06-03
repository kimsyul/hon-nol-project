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
        <div>
            {comments.map((comment: Comment) => (
                <CommentItem key={comment.id}>
                    <p>{comment.text}</p>
                </CommentItem>
            ))}
        </div>
    );
};

export default CommentsList;

const CommentItem = styled.div`
    padding: 10px;
    border-bottom: 1px solid #ccc;
    &:last-child {
        border-bottom: none;
    }
    color: black;
`;
