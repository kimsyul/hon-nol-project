import Nav from '../components/layouts/Nav';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { categories } from '../categoryList';

const Regions = (): JSX.Element => {
    return (
        <Nav>
            {Object.entries(categories.regions).map(([key, { name }]) => (
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

export default Regions;
