import { Input, Button } from './Form';
import styled from 'styled-components';

export const Title = styled(Input)`
    margin-bottom: 0;
`;

export const Form = styled.form`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: none;
    border-radius: 4px;
    height: 100vh;
`;

export const SelectContainer = styled.div`
    display: flex;
`;

export const Select = styled.select`
    width: 30%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    &:focus {
        border-color: #ffabab;
        outline: none;
    }

    &:last-child {
        margin-right: 0;
    }
`;

export const EditorContainer = styled.div`
    overflow: auto;
`;

export const SubmitButton = styled(Button)`
    width: 100px;
`;
