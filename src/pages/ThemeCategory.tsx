import { Link } from 'react-router-dom';
import Nav from '../components/layouts/Nav';
import styled from 'styled-components';
import { categories } from '../categoryList';

const ThemeCategory = (): JSX.Element => {
    return (
        <Nav>
            <StyledCategories to="/">전체보기</StyledCategories>

            {Object.entries(categories.themes).map(([key, { name }]) => (
                <StyledCategories key={key} to={key}>
                    {name}
                </StyledCategories>
            ))}
        </Nav>
    );
};

const StyledCategories = styled(Link)`
    padding: 10px;
    &:hover {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export default ThemeCategory;
