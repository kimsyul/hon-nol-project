import { Link } from 'react-router-dom';
import Nav from '../components/common/Nav';
import styled from 'styled-components';

type category = { name: string; text: string };
const categories: category[] = [
    { name: `full-view`, text: '전체보기' },
    { name: `nature`, text: '자연' },
    { name: `culture`, text: `문화` },
    { name: `restaurant`, text: `식당` },
    { name: `cafe`, text: `카페` },
    { name: `festival`, text: `축제` },
    { name: `leisure`, text: `레저` },
    { name: `travel`, text: `여행` },
    { name: `the-others`, text: `기타` },
];

const ThemeCategory = (): JSX.Element => {
    return (
        <Nav>
            {categories.map((c) => (
                <StyledCategories key={c.name} to={c.name}>
                    {c.text}
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
