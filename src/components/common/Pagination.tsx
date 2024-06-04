import styled from 'styled-components';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrev, onNext }) => {
    const pageNumbers: number[] = [];

    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(currentPage + 1, totalPages);

    if (currentPage > 1) {
        pageNumbers.push(1);
        if (currentPage > 2) {
            pageNumbers.push(-1);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
        }
    }

    return (
        <PaginationContainer>
            <PageButton onClick={onPrev} disabled={currentPage === 1}>
                previous
            </PageButton>
            <PageButton>Page {currentPage} of</PageButton>
            <PageButton onClick={onNext} disabled={currentPage === totalPages}>
                Next
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;

const PageButton = styled.button`
    padding: 8px 12px;
    margin: 0 4px;
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
