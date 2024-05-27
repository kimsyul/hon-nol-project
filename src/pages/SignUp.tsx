import { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, AuthError } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { Container, Title, Input, Button, ErrorMessage, GoogleButton } from '../assets/styles/Form';
import { useNavigate } from 'react-router-dom';

const SignUp = (): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleGoogleSignup = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch (err) {
            setError('구글 계정을 다시 확인해주세요. ㅠ_ㅠ');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('입력하신 비밀번호가 일치하지 않습니다. ㅠ_ㅠ');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await signInWithEmailAndPassword(auth, email, password);
            alert('회원가입 성공! 환영합니다~ :-)');
            navigate('/');
        } catch (err) {
            const error = err as AuthError;
            if (error.code === 'auth/email-already-in-use') {
                setError('이미 사용 중인 이메일입니다.');
            } else if (error.code === 'auth/weak-password') {
                setError('비밀번호는 최소 6자 이상으로 설정해주세요!');
            } else if (error.code === 'auth/invalid-email') {
                setError('유효한 이메일 형식으로 입력해주세요.');
            } else {
                console.error('Error signing up: ', error);
                setError('회원가입에 실패했습니다. 다시 시도해주세요. ㅠ_ㅠ');
            }
        }
    };

    return (
        <Container>
            <Title>Signup</Title>
            <form onSubmit={handleSubmit}>
                <Input
                    id="signupId"
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    id="signupPassword"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit">회원가입</Button>
            </form>
            <GoogleButton onClick={handleGoogleSignup}>구글 계정으로 회원가입</GoogleButton>
            <SignupLink to="/login">이미 계정이 있으신가요?</SignupLink>
        </Container>
    );
};

const SignupLink = styled(Link)`
    text-align: center;
    display: block;
    font-size: 14px;
    &:hover {
        color: #ffabab;
    }
`;

export default SignUp;
