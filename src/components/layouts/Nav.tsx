import styled from 'styled-components';

const Nav = (): JSX.Element => {
  return (
    <NavContainer>
      <NavTitle>혼자놀기</NavTitle>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  width: 100%;
  height: 110px;
  background: #dbebff;
`;

const NavTitle = styled.div`
  color: wheat;
`;

export default Nav;
