import styled from 'styled-components';

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

export const ItemContainer = styled.div`
    margin-bottom: 10px;
    display: flex;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
`;

export const PostTitle = styled.h3`
    margin: 0 0 10px 0;
    color: #333;
`;

export const PostPreview = styled.p`
    margin: 0;
    color: #666;
`;

export const Info = styled.p`
    font-size: 0.8em;
    color: #999;
`;
