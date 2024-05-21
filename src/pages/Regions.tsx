import Nav from '../components/common/Nav';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type category = { name: string; text: string };
const categories: category[] = [
    { name: `full-view`, text: '전체보기' },
    { name: `seoul`, text: `서울` },
    { name: `gyeonggi-do`, text: `경기도` },
    { name: `incheon`, text: `인천` },
    { name: `daejeon`, text: `대전` },
    { name: `gwangju`, text: `광주` },
    { name: `ulsan`, text: `울산` },
    { name: `daegu`, text: `대구` },
    { name: `busan`, text: `부산` },
    { name: `sejong`, text: `세종` },
    { name: `gangwon-do`, text: `강원도` },
    { name: `chungcheong-do`, text: `충청도` },
    { name: `gyeongsang-do`, text: `경상도` },
    { name: `jeolla-do`, text: `전라도` },
    { name: `jeju-do`, text: `제주도` },
];

const Regions = (): JSX.Element => {
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

export default Regions;
