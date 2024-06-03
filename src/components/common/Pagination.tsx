import styled from 'styled-components';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrev, onNext }) => {
    return (
        <PaginationContainer>
            <PageButton onClick={onPrev} disabled={currentPage === 1}>
                previous
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`;

const PageButton = styled.button`
    padding: 8px 16px;
    margin: 0 5px;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;

    &:disabled {
        color: #ccc;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: #e0e0e0;
    }
`;

const PageIndicator = styled.span`
    align-self: center;
`;
