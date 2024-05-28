import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Title from '../common/Title';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { categories } from '../../categoryList';
import { NavContainer, NavLink, CategoryNav } from './Nav';

const Header = (): JSX.Element => {
    const [user, setUser] = useState<User | null>(null);
    const [menu, setMenu] = useState('home');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user as User | null);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('로그아웃에 실패했습니다.', error);
        }
    };
    return (
        <>
            <HeaderContainer>
                <Title />
                <CategoryContainer>
                    <CategoryButton to="/" onClick={() => setMenu('home')}>홈</CategoryButton>
                    <CategoryButton to="/regions" onClick={() => setMenu('regions')}>지역별</CategoryButton>
                    <CategoryButton to="/theme" onClick={() => setMenu('themes')}>테마별</CategoryButton>
                </CategoryContainer>
                {user ? (
                    <div>
                        <LoginButton to="/post">글쓰기</LoginButton>
                        <LogoutButton to="/" onClick={handleLogout}>
                            로그아웃
                        </LogoutButton>
                    </div>
                ) : (
                    <div>
                        <LoginButton to="/login">로그인</LoginButton>
                        <LoginButton to="/sign-up">회원가입</LoginButton>
                    </div>
                )}
            </HeaderContainer>
            <NavContainer>
                {menu === 'regions' && (
                    <CategoryNav>
                        {Object.entries(categories.regions).map([key, value])=> (
                        <NavLink key={key}></NavLink>
                    )}</CategoryNav>
                )}
            </NavContainer>
        </>
    );
};

const HeaderContainer = styled.div`
    width: 100%;
    height: 80px;
    background: white;
    border-bottom: 1px solid #dbebff;
    display: flex;
    align-items: center;
    padding: 10px 25px;
    justify-content: space-between;
    position: relative;
    z-index: 10;
`;

//카테고리

const CategoryContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    flex-grow: 1;
    color: gray;
`;

const CategoryButton = styled(Link)`
    margin-right: 15px;
    padding: 10px;
    &:hover {
        color: #ffabab;
        border-bottom: 3px solid #ffabab;
    }
`;

//버튼

const Button = styled(Link)`
    width: 80px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #86ade8;
    font-weight: bold;
    padding: 10px;
    margin-right: 5px;
    &:hover {
        border-color: #ffabab;
    }
    &:last-child {
        margin-right: 0px;
    }
`;

const LogoutButton = styled(Button)`
    background-color: white;
    color: #86ade8;
    &:hover {
        color: #ffabab;
    }
`;

const LoginButton = styled(Button)`
    background-color: #86ade8;
    color: white;
    &:hover {
        background-color: #ffabab;
    }
`;

export default Header;
