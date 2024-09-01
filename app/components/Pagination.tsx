import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const pageNumbers = [];
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-12 space-x-2">
      {currentPage > 1 && (
        <Link href={`/pokemon/${currentPage - 1}`} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105">
          ←
        </Link>
      )}
      {pageNumbers.map((number) => (
        <Link
          key={number}
          href={`/pokemon/${number}`}
          className={`${
            number === currentPage
              ? 'bg-white text-gray-800'
              : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
          } font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105`}
        >
          {number}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`/pokemon/${currentPage + 1}`} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105">
          →
        </Link>
      )}
    </div>
  );
};

export default Pagination;