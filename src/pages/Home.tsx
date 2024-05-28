import styled from 'styled-components';
import Nav from '../components/layouts/Nav';

const Home = (): JSX.Element => {
    return (
        <HomeContainer>
            <Nav>반가워요! 당신의 혼자만의 시간을 응원합니다! :)</Nav>
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    height: 1000px;
`;

export default Home;
