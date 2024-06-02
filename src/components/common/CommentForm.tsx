import { useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { Button } from '../../assets/styles/Form';

interface CommentFormProps {
    postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (comment.trim() === '') return;

        const commentData = {
            postId: postId,
            text: comment,
            createdAt: new Date(),
        };

        try {
            await addDoc(collection(db, 'comments'), commentData);
            setComment('');
        } catch (error) {
            console.error('Error adding comment: ', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="댓글을 적어주세요!" />
            <Button type="submit">게시하기</Button>
        </Form>
    );
};

export default CommentForm;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const Textarea = styled.textarea`
    margin-bottom: 10px;
    padding: 8px;
    resize: none;
`;
