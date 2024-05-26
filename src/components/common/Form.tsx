import styled from 'styled-components';

export const Container = styled.div`
    background-color: white;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
`;

export const Title = styled.h1`
    margin-bottom: 24px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #333;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    &:focus {
        border-color: #ffabab;
        outline: none;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #86ade8;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #ffabab;
    }
    margin-bottom: 16px;
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 15px;
    margin-bottom: 16px;
    text-align: center;
`;

export const GoogleButton = styled(Button)`
    background-color: #db4437;
    &:hover {
        background-color: #c33d2e;
    }
    margin-bottom: 14px;
`;
