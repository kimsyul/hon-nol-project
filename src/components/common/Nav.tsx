import styled from 'styled-components';
import { ReactNode } from 'react';

interface NavProps {
  children: ReactNode;
}

const Nav = ({ children }: NavProps): JSX.Element => {
  return (
    <NavContainer>
      <CategoryContainer>{children}</CategoryContainer>
    </NavContainer>
  );
};

const NavContainer = styled.div`
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

const CategoryContainer = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Nav;
