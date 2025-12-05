import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import { CaretLeft, MagnifyingGlass } from '@phosphor-icons/react';
import { secondary } from '@/theme/colors';

interface TabSearchProps {
  show: boolean;
  closeSearch: () => void;
  baseURL: string;
}

const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const fadeOutToRight = keyframes`
  0% {
    
    transform: translateX(0);
  }
  100% {
    
    transform: translateX(100%);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: transparent;
  border-bottom: 1px solid #B2CFCD;
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;
  color: white;
  font-size: 18px;
  padding-right: 24px;
  padding-bottom: 4px;
  font-family: 'Rubik';

  &::placeholder {
    color: #B2CFCD;
    font-size: 18px;
  }
`;

const TabSearch: React.FC<TabSearchProps> = (props) => {
  const [keyword, setKeyword] = React.useState('');

  const handleSearch = (keyword: string) => {
    window.location.href = `${props.baseURL}?s=${keyword}`;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(keyword);
  };

  return (
    <Box
      sx={{ 
        display: props.show ? 'block' : 'none',
        padding: '0px 18px',
        animation: `${props.show ? slideInFromRight : fadeOutToRight} 0.2s forwards`,
        overflow: 'hidden'
      }}
    >
      <Typography 
        onClick={props.closeSearch}
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          color: '#FF54AA',
          size: '18px',
          fontWeight: 600,
          gap: 1,
          cursor: 'pointer'
        }}
      >
        <CaretLeft size={14} weight='bold' />
        Search
      </Typography>

      <form onSubmit={onSubmit}>
        <Box
          bgcolor={secondary[900]}
          margin={0}
          height='80vh'
          display='flex'
          justifyContent='center'
          pt={9}
        >
          <Stack gap='16px' alignItems='start' width='100%'>
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
    </Box>
  )
}

export default TabSearch;