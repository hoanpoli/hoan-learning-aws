import React from 'react';
import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

interface PaginationCompProps {
  page: number;
  totalPage: number;
  gotoPrev: () => void;
  gotoNext: () => void;
}

const PaginationComp: React.FC<PaginationCompProps> = ({
  gotoNext,
  gotoPrev,
  page,
  totalPage
}) => {
  return (
    <Box mt='48px' mb='60px' display='flex' justifyContent='center'>
      <Stack direction='row' spacing='24px' alignItems='center'>
        <ButtonBase
          disabled={page <= 1 ? true : false}
          onClick={() => gotoPrev()}
          sx={{
            'padding': '14px',
            'justifyContent': 'center',
            'alignItems': 'center',
            'border': '1px solid #D2D6DB',
            'borderRadius': '12px',
            'boxShadow': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            '&:hover': {
              backgroundColor: '#E5E7EB'
            },
            '&:disabled': {
              border: '1px solid #E5E7EB',
              backgroundColor: '#f0f0f0'
            }
          }}
        >
          <ArrowLeft size='20px' color='#384250' />
        </ButtonBase>

        <Typography
          fontFamily='Montserrat'
          fontSize='12px'
          fontWeight='500'
          lineHeight='18px'
        >
          Page {page} out of {totalPage}
        </Typography>
        <ButtonBase
          disabled={page === totalPage ? true : false}
          onClick={() => gotoNext()}
          sx={{
            'padding': '14px',
            'justifyContent': 'center',
            'alignItems': 'center',
            'border': '1px solid #D2D6DB',
            'borderRadius': '12px',
            'boxShadow': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            '&:hover': {
              backgroundColor: '#E5E7EB'
            },
            '&:disabled': {
              border: '1px solid #E5E7EB',
              backgroundColor: '#f0f0f0'
            }
          }}
        >
          <ArrowRight size='20px' color='#384250' />
        </ButtonBase>
      </Stack>
    </Box>
  );
};

export default PaginationComp;
