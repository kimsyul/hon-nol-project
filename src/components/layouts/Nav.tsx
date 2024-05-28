import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Categories } from '../../categoryList';

interface SubNavProps {
    menu: string;
    categories: Categories;
}

const Nav: React.FC<SubNavProps> = ({ menu, categories }) => {
    return (
        <NavContainer>
            {menu === 'home' && (
                <CategoryNav>반가워요! 당신의 혼자만의 시간을 응원합니다! :)</CategoryNav>
            )}
            {menu === 'regions' && (
                <CategoryNav>
                    <NavLink to='/all'>전체보기</NavLink>
                    {Object.entries(categories.regions).map(([key, value]) =>(
                        <NavLink key={key} to={`/region/${key}`}>
                            {value.name}
                        </NavLink>
                    ))}
                </CategoryNav>
            )}
            {menu === 'themes' && (
                <CategoryNav>
                    <NavLink to='/all'>전체보기</NavLink>
                    {Object.entries(categories.themes).map(([key, value]) =>(
                        <NavLink key={key} to={`/theme/${key}`}>
                            {value.name}
                        </NavLink>
                    ))}
                </CategoryNav>
            )}
        </NavContainer>
\           
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
