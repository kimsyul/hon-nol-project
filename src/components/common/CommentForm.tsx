import { useState, useContext } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FirebaseContext } from '../../FirebaseContext';
import styled from 'styled-components';
import { Button } from '../../assets/styles/Form';

interface CommentFormProps {
    postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
    const [comment, setComment] = useState<string>('');
    const { currentUser } = useContext(FirebaseContext);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!currentUser) {
            alert('로그인이 필요합니다!');
            return;
        }

        if (comment.trim() === '') {
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        const commentData = {
            postId,
            comment,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            authorId: currentUser.uid,
        };

        try {
            await addDoc(collection(db, 'posts', postId, 'comments'), commentData);
            console.log('Comment successfully written!');
            setComment('');
        } catch (error) {
            console.error('Error adding comment: ', error);
            alert('다시 시도해주세요.ㅠ_ㅠ');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Textarea
                id="commentForm"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="댓글을 적어주세요!"
            />
            <CommentButton type="submit">등록</CommentButton>
        </Form>
    );
};

export default CommentForm;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: end;
`;

const Textarea = styled.textarea`
    padding: 8px;
    resize: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;
    width: 100%;
    &:focus {
        border-color: #ffabab;
        outline: none;
    }
`;

const CommentButton = styled(Button)`
    width: 20%;
`;
