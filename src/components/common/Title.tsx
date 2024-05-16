import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = (): JSX.Element => {
  return (
    <TitleContainer to="/">
      <MainTitle>혼자놀기</MainTitle>
      <SubTitle>HonNol</SubTitle>
    </TitleContainer>
  );
};

//타이틀

const TitleContainer = styled(Link)`
  font-weight: bold;
  color: #86ade8;
  display: flex;
  align-items: end;
  margin-right: 45px;
`;

const MainTitle = styled.div`
  font-size: 40px;
  margin-right: 10px;
`;

const SubTitle = styled.div`
  font-size: 20px;
`;

export default Title;
