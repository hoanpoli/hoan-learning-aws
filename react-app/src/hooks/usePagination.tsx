import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface PaginationInterface {
    page?: number;
    limitItem?: number;
    searchItem?: string;
}

const usePagination = ({ limitItem = 6, page = 1, searchItem = '' }: PaginationInterface) => {
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [searchParams, setSearchParams] = useSearchParams({keyword: searchItem});
  const [totalPages, setTotalPages] = useState<number>(1);
  const keyword = searchParams.get('keyword');

  const onSearchChange = (e: string) => setSearchParams({ keyword: e });

  const goToNextPage = () => {
    const nextPage = Math.min(currentPage + 1, totalPages);
    setCurrentPage(nextPage);
    return nextPage;
  }

  const goToPrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    setCurrentPage(prevPage);
    return prevPage;
  }

  return {
    currentPage,
    totalPages,
    limitItem,
    keyword,
    goToNextPage,
    goToPrevPage,
    onSearchChange,
    setTotalPages
  };
};

export default usePagination;