import { Link } from 'react-router-dom';
import Nav from '../components/common/Nav';
import styled from 'styled-components';

type category = { name: string; text: string };
const categories: category[] = [
  { name: `full-view`, text: '전체보기' },
  { name: `cafe`, text: `식당` },
  { name: `restaurant`, text: `식당` },
  { name: `cultural-life`, text: `문화생활` },
  { name: `activity`, text: `액티비티` },
  { name: `outside`, text: `야외활동` },
  { name: `travel`, text: `여행` },
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
