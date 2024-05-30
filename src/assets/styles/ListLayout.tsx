import styled from 'styled-components';

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const ItemContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    & :hover,
    & :focus {
        background-color: #ffabab;
        outline: none;
    }
`;

export const PostItem = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    background: #f9f9f9;
`;

export const ImagePreview = styled.img`
    width: 150px;
    height: 100px;
    object-fit: cover;
`;

export const TextContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const PostTitle = styled.h3`
    margin: 0;
`;

export const PostPreview = styled.p`
    color: #666;
`;

export const Info = styled.p`
    font-size: 0.8em;
    color: #999;
`;
