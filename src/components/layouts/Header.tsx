import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Title from '../common/Title';

const Header = (): JSX.Element => {
  return (
    <HeaderContainer>
      <Title />
      <CategoryContainer>
        <CategoryButton to="/">홈</CategoryButton>
        <CategoryButton to="/regions">지역별</CategoryButton>
        <CategoryButton to="/theme">테마별</CategoryButton>
      </CategoryContainer>
      <div>
        <WriteButton to="/wright">글쓰기</WriteButton>
        <LoginButton to="/login">로그인</LoginButton>
        <LoginButton to="/sign-up">회원가입</LoginButton>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  background: white;
  border-bottom: 1px solid #dbebff;
  display: flex;
  align-items: center;
  padding: 10px 25px;
  justify-content: space-between;
  position: relative;
  z-index: 10;
`;

//카테고리

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  flex-grow: 1;
  color: gray;
`;

const CategoryButton = styled(Link)`
  margin-right: 15px;
  padding: 10px;
  &:hover {
    color: #ffabab;
    border-bottom: 3px solid #ffabab;
  }
`;

//버튼

const Button = styled(Link)`
  width: 80px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #86ade8;
  font-weight: bold;
  padding: 10px;
  margin-right: 5px;
  &:hover {
    border-color: #ffabab;
  }
  &:last-child {
    margin-right: 0px;
  }
`;

const WriteButton = styled(Button)`
  background-color: white;
  color: #86ade8;
  &:hover {
    color: #ffabab;
  }
`;

const LoginButton = styled(Button)`
  background-color: #86ade8;
  color: white;
  &:hover {
    background-color: #ffabab;
  }
`;

export default Header;
