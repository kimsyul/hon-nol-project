import styled from 'styled-components';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Title, Input, Button, ErrorMessage, GoogleButton } from '../components/common/Form';

const Login = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요! :)');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch (err) {
            setError('구글 계정을 확인해 주세요! :)');
        }
    };

    return (
        <Container>
            <Title>Login</Title>
            <form onSubmit={handleSubmit}>
                <Input
                    id="loginId"
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <Input
                    id="loginPassword"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit">로그인</Button>
            </form>
            <GoogleButton onClick={handleGoogleLogin}>구글 계정으로 로그인</GoogleButton>
            <Text>
                <span>이메일/비밀번호 찾기</span>
                <Link to="/sign-up">회원가입</Link>
            </Text>
        </Container>
    );
};

const Text = styled.div`
    font-size: 14px;
    display: flex;
    justify-content: space-between;
`;

export default Login;
