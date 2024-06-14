import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialSearchTerm: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialSearchTerm }) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        onSearch(searchTerm);
        setSearchTerm('');
    };

    return (
        <SearchForm onSubmit={handleSubmit}>
            <SearchInput
                id="searchBar"
                type="text"
                placeholder="검색어를 입력하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">검색</SearchButton>
        </SearchForm>
    );
};

export const SearchForm = styled.form`
    display: flex;
    align-items: center;
`;

export const SearchInput = styled.input`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 8px;
    &:focus {
        outline: none;
        border-color: #ffabab;
    }
`;

export const SearchButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border: 1px solid #86ade8;
    border-radius: 4px;
    background-color: white;
    color: #86ade8;
    cursor: pointer;
    &:hover {
        outline: none;
        border-color: #ffabab;
        color: #ffabab;
    }
`;

export default SearchBar;
