import React, {useEffect} from 'react';
import {Box, Button, HStack} from '@chakra-ui/react';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  size?: string;
}

const Paginator = ({currentPage, totalPages, onChange, size = 'md'}: PaginatorProps) => {
  const [isFirstPage, setIsFirstPage] = React.useState(currentPage === 1);
  const [isLastPage, setIsLastPage] = React.useState(currentPage === totalPages);
  const [startingPage, setStartingPage] = React.useState(1);

  useEffect(() => {
    setIsFirstPage(currentPage === 1);
    setIsLastPage(currentPage === totalPages);

    if (currentPage > totalPages - 2) {
      setStartingPage(totalPages - 4);
    } else if (currentPage > 3) {
      setStartingPage(currentPage - 2);
    } else {
      setStartingPage(1);
    }
  }, [currentPage, totalPages]);

  return (
    <HStack w='full' justifyContent='space-between' p={4}>
      <Button size={size} onClick={() => onChange(currentPage - 1)} isDisabled={isFirstPage}>
        Previous
      </Button>
      <Box>
        {totalPages > 5 && currentPage > 3 && (
          <Button size={size} mr={8} variant='outline' onClick={() => onChange(1)}>
            1
          </Button>
        )}
        {Array.from({length: 5}, (_, i) => i + startingPage)
          .filter((page) => page > 0 && page <= totalPages)
          .map((page) => (
            <Button
              key={page}
              size={size}
              mx={1}
              onClick={() => onChange(page)}
              variant={page === currentPage ? 'solid' : 'outline'}
              colorScheme={page === currentPage ? 'brand' : 'gray'}
            >
              {page}
            </Button>
          ))}
        {totalPages > 5 && currentPage <= totalPages - 3 && (
          <Button size={size} ml={8} variant='outline' onClick={() => onChange(totalPages)}>
            {totalPages}
          </Button>
        )}
      </Box>
      <Button size={size} onClick={() => onChange(currentPage + 1)} isDisabled={isLastPage}>
        Next
      </Button>
    </HStack>
  );
};

export default Paginator;
