import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';

interface Comment {
    text: string;
}

interface CommentsListProps {
    postId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'comments'), where('postId', '==', postId), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const commentsArray: Comment[] = [];
            querySnapshot.forEach((doc) => {
                commentsArray.push(doc.data() as Comment);
            });
            setComments(commentsArray);
        });
        return () => unsubscribe();
    }, [postId]);

    return (
        <div>
            {comments.map((comment, index) => (
                <CommentItem key={index}>
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
`;
