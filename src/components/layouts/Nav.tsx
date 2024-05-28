import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { categories } from '../../categoryList';

const Nav = ({ children }: NavPro): JSX.Element => {
    return (
        <NavContainer>
            <NavLink to="/">전체보기</NavLink>
            <CategoryContainer>{children}</CategoryContainer>
        </NavContainer>
    );
};

export const NavContainer = styled.div`
    width: 100%;
    height: 55px;
    background-color: #86ade8;
    color: white;
    position: relative;
    z-index: 10;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
`;

export const NavLink = styled(Link)`
    padding: 10px;
    &:hover {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export const CategoryNav = styled.nav`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default Nav;
