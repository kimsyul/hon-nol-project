import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm}&field=all`);
        }
    };

    return (
        <SearchForm onSubmit={handleSearch}>
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
