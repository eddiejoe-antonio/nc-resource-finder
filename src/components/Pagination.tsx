import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className='flex justify-center items-center my-4 overflow-x-auto'>
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className='px-2 py-1 mx-1 bg-gray-200 rounded-md md:hover:bg-[#dedede]'
      >
        {'<<'}
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-2 py-1 mx-1 bg-gray-200 rounded-md md:hover:bg-[#dedede]'
      >
        {'<'}
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`px-2 py-1 mx-1 rounded-md ${
            page === currentPage ? 'bg-[#1E79C8] text-white' : 'bg-gray-200 md:hover:bg-[#dedede]'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-2 py-1 mx-1 bg-gray-200 rounded-md md:hover:bg-[#dedede]'
      >
        {'>'}
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className='px-2 py-1 mx-1 bg-gray-200 rounded-md md:hover:bg-[#dedede]'
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
