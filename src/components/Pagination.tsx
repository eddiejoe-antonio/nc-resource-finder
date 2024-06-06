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

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='flex justify-center items-center my-4 overflow-x-auto'>
      <label htmlFor='firstpage-button' className='hidden text-sm font-medium text-gray-700'>
        First Page Button
      </label>
      <label htmlFor='lastpage-button' className='hidden text-sm font-medium text-gray-700'>
        Last Page Button
      </label>
      <label htmlFor='previouspage-button' className='hidden text-sm font-medium text-gray-700'>
        Previous Page Button
      </label>
      <label htmlFor='pagenumber' className='hidden text-sm font-medium text-gray-700'>
        Page Number
      </label>
      <label htmlFor='nextpage-button' className='hidden text-sm font-medium text-gray-700'>
        Next Page Button
      </label>
      <button
        id='firstpage-button'
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className='px-2 py-1 mx-1 bg-gray-200 rounded-md md:hover:bg-[#dedede]'
      >
        {'<<'}
      </button>
      <button
        id='previouspage-button'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-2 py-1 mx-1 bg-gray-200 rounded-md md:hover:bg-[#dedede]'
      >
        {'<'}
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          id='pagenumber'
          key={index}
          onClick={() => handlePageChange(page as number)}
          className={`px-2 py-1 mx-1 rounded-md ${
            page === currentPage ? 'bg-[#1E79C8] text-white' : 'bg-gray-200 md:hover:bg-[#dedede]'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        id='nextpage-button'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-2 py-1 mx-1 bg-gray-200 rounded-md md:hover:bg-[#dedede]'
      >
        {'>'}
      </button>
      <button
        id='lastpage-button'
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
