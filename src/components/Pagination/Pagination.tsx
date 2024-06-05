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

    return (
        <PaginationContainer>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                이전
            </button>
            {[...Array(totalPages).keys()].map((num) =>
                num + 1 === currentPage ||
                (num + 1 >= currentPage && num + 1 <= currentPage + 3) ||
                num + 1 === totalPages ? (
                    <button key={num + 1} onClick={() => onPageChange(num + 1)}>
                        {num + 1}
                    </button>
                ) : num + 1 === currentPage + 4 ? (
                    <span key={num + 1}>...</span>
                ) : null,
            )}
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
