import styled from 'styled-components';

export const PostContainer = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    height: 100vh;
`;

export const PostItem = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
    font-size: 20px;
    margin-bottom: 10px;
`;

export const Content = styled.div`
    font-size: 16px;
`;
