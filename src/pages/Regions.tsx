import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Regions = (): JSX.Element => {
    return <div>regions</div>;
};

const StyledCategories = styled(Link)`
    padding: 10px;
    &:hover {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export default Regions;
