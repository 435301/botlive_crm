import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // const pages = [...Array(totalPages).keys()].map((n) => n + 1);
  const maxPagesToShow = 4;

  let startPage = Math.max(currentPage - 1, 1);
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPagesToShow + 1, 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return (
    <div className="pagination-container">
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹ Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`page-btn ${currentPage === page ? "active" : ""
            }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next ›
      </button>
    </div>
  );
};

export default Pagination;
