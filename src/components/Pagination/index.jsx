import './index.scss';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <section id={"pagination"}>
            <button
                className={"pagesChevron"}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    className={currentPage === index + 1 ? "selected" : ""}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button
                className={"pagesChevron"}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                <FaChevronRight />
            </button>
        </section>
    );
}

export default Pagination;
