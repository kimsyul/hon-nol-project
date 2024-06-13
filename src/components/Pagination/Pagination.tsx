import styled from 'styled-components';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleFirstPage = () => {
        if (currentPage !== 1) {
            onPageChange(1);
        }
    };

    const handleLastPage = () => {
        if (currentPage !== totalPages) {
            onPageChange(totalPages);
        }
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const groupSize = 3;

        let startPage = Math.max(1, currentPage - Math.floor(groupSize / 2));
        let endPage = startPage + groupSize - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - groupSize + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <PaginationContainer>
            <PageButton onClick={handleFirstPage} disabled={currentPage === 1}>
                {'<<'}
            </PageButton>
            <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
                {'<'}
            </PageButton>

            {getPageNumbers().map((num) => (
                <PageButton key={num} onClick={() => onPageChange(num)} $active={num === currentPage}>
                    {num}
                </PageButton>
            ))}
            <PageButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                {'>'}
            </PageButton>
            <PageButton onClick={handleLastPage} disabled={currentPage === totalPages}>
                {'>>'}
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-top: 20px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
    font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
    color: ${({ $active }) => ($active ? '#ffabab' : 'gray')};
    padding: 5px 10px;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
        color: #ccc;
    }
`;
