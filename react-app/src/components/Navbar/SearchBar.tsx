import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Collapse, Stack, Typography } from '@mui/material';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { secondary } from '@/theme/colors';

const StyledInput = styled.input`
  width: 100%;
  background-color: transparent;
  border-bottom: 1px solid ${secondary[100]};
  border-right: none;
  outline: none;
  color: white;
  font-size: 18px;
  padding-right: 24px;
  padding-bottom: 4px;
  font-family: 'Rubik';

  &::placeholder {
    color: ${secondary[100]};
    font-size: 18px;
  }
`;

interface SearchBarProps {
  isOpenSearch: boolean;
  baseURL: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ baseURL, isOpenSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = (keyword: string) => {
    window.location.href = `${baseURL}?s=${keyword}`;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(keyword);
  };

  return (
    <Collapse
      in={isOpenSearch}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: 'absolute',
        width: '100%'
      }}
    >
      <form onSubmit={onSubmit}>
        <Box
          bgcolor={secondary[900]}
          margin={0}
          height='80vh'
          display='flex'
          justifyContent='center'
          pt={9}
        >
          <Stack gap='16px' alignItems='start' maxWidth={538} width='100%'>
            <Typography fontSize={16} fontWeight={600} color={secondary[100]}>
              Search
            </Typography>
            <Stack
              direction='row'
              gap={2}
              alignItems='center'
              width='100%'
              position='relative'
            >
              <StyledInput
                placeholder='Start your search here'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <MagnifyingGlass
                size={20}
                color='white'
                style={{ position: 'absolute', right: 0, bottom: 5 }}
              />
            </Stack>
          </Stack>
        </Box>
      </form>
    </Collapse>
  );
};

export default SearchBar;
