import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import { categories } from '../../categoryList';
import { SearchInput } from './SearchBar';
import { Select, SelectContainer } from '../../assets/styles/PostStyle';
import { Button } from '../../assets/styles/Form';
import { FirestoreDocument } from '../../hook/usePaginationData';

interface AdvancedSearchBarProps {
    onSearch: (
        searchTerm: string,
        region: string,
        subregion: string,
        theme: string,
        subtheme: string,
        searchField: keyof FirestoreDocument | 'all',
    ) => void;
    initialSearchTerm?: string;
    initialRegion?: string;
    initialSubregion?: string;
    initialTheme?: string;
    initialSubtheme?: string;
    initialSearchField?: keyof FirestoreDocument | 'all';
}

const AdvancedSearchBar: React.FC<AdvancedSearchBarProps> = ({
    onSearch,
    initialSearchTerm = '',
    initialRegion = '',
    initialSubregion = '',
    initialTheme = '',
    initialSubtheme = '',
    initialSearchField = 'all',
}) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [selectedRegion, setSelectedRegion] = useState(initialRegion);
    const [selectedSubregion, setSelectedSubregion] = useState(initialSubregion);
    const [selectedTheme, setSelectedTheme] = useState(initialTheme);
    const [selectedSubtheme, setSelectedSubtheme] = useState(initialSubtheme);
    const [searchField, setSearchField] = useState<keyof FirestoreDocument | 'all'>(
        initialSearchField as keyof FirestoreDocument | 'all',
    );

    useEffect(() => {
        setSearchTerm(initialSearchTerm);
        setSelectedRegion(initialRegion);
        setSelectedSubregion(initialSubregion);
        setSelectedTheme(initialTheme);
        setSelectedSubtheme(initialSubtheme);
        setSearchField(initialSearchField);
    }, [initialSearchTerm, initialRegion, initialSubregion, initialTheme, initialSubtheme, initialSearchField]);

    const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedRegion(e.target.value);
        setSelectedSubregion('');
    };

    const handleSubregionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubregion(e.target.value);
    };

    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTheme(e.target.value);
        setSelectedSubtheme('');
    };

    const handleSubthemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubtheme(e.target.value);
    };

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm, selectedRegion, selectedSubregion, selectedTheme, selectedSubtheme, searchField);
    };

    const handleSearchFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as keyof FirestoreDocument | 'all';
        setSearchField(value);
    };

    return (
        <SearchBarContainer onSubmit={handleSearch}>
            <SearchInput
                id="advancedKeyword"
                type="text"
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                placeholder="검색어를 입력하세요"
            />
            <SelectContainer>
                <Select id="searchField" value={searchField} onChange={handleSearchFieldChange}>
                    <option value="all">제목 및 내용</option>
                    <option value="title">제목</option>
                    <option value="content">내용</option>
                </Select>
                <Select id="searchRegion" value={selectedRegion} onChange={handleRegionChange}>
                    <option value="">상위 지역 선택</option>
                    {Object.keys(categories.regions).map((key) => (
                        <option key={key} value={key}>
                            {categories.regions[key].name}
                        </option>
                    ))}
                </Select>
                <Select id="searchSubregion" value={selectedSubregion} onChange={handleSubregionChange}>
                    <option value="">하위 지역 선택</option>
                    {selectedRegion &&
                        Object.keys(categories.regions[selectedRegion].subregions).map((key) => (
                            <option key={key} value={key}>
                                {categories.regions[selectedRegion].subregions[key].name}
                            </option>
                        ))}
                </Select>
                <Select id="searchTheme" value={selectedTheme} onChange={handleThemeChange}>
                    <option value="">상위 테마 선택</option>
                    {Object.keys(categories.themes).map((key) => (
                        <option key={key} value={key}>
                            {categories.themes[key].name}
                        </option>
                    ))}
                </Select>
                <Select id="searchSubtheme" value={selectedSubtheme} onChange={handleSubthemeChange}>
                    <option value="">하위 테마 선택</option>
                    {selectedTheme &&
                        Object.keys(categories.themes[selectedTheme].subthemes).map((key) => (
                            <option key={key} value={key}>
                                {categories.themes[selectedTheme].subthemes[key].name}
                            </option>
                        ))}
                </Select>
            </SelectContainer>
            <Button type="submit">검색</Button>
        </SearchBarContainer>
    );
};

export default AdvancedSearchBar;

const SearchBarContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #f9f9f9;
`;
