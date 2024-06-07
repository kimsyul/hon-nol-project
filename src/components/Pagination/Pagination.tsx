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

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage || (i >= currentPage && i <= currentPage + 3) || i === totalPages) {
                pages.push(
                    <button key={i} onClick={() => onPageChange(i)} disabled={i === currentPage}>
                        {i}
                    </button>,
                );
            } else if (i === currentPage + 4) {
                pages.push(<span key={i}>...</span>);
            }
        }

        return pages;
    };

    return (
        <PaginationContainer>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                이전
            </button>
            {renderPageNumbers()}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                다음
            </button>
        </PaginationContainer>
    );
};

export default Pagination;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 20px;

    button {
        border: 1px solid #ccc;
        background-color: white;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        &:disabled {
            cursor: not-allowed;
            color: #ccc;
        }
    }

    span {
        display: flex;
        align-items: center;
    }
`;
