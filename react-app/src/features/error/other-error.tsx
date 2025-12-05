import React from 'react';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ButtonPrimaryLight from '@/components/Button/ButtonPrimaryLight';
import { neutral, secondary } from '@/theme/colors';

interface ErrorProps {
  message: string;
  status: number;
}

const OtherError: React.FC<ErrorProps> = ({ message, status }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  return (
    <Box bgcolor={secondary[800]}>
      <Box
        p='20px'
        margin='0 auto'
        width='fit-content'
        py={isMobile ? '50px' : '100px'}
        maxWidth='800px'
      >
        <Stack alignItems='center' height='100%' gap={3}>
          <Typography
            fontWeight='500'
            fontSize='36px'
            color={neutral[900]}
            lineHeight='44px'
            letterSpacing='-2%'
          >
            Oops, It seems there is a problem..
          </Typography>

          <Typography
            color={neutral[600]}
            lineHeight='24px'
          >
            status:{status}
          </Typography>

          <Typography
            color={neutral[600]}
            lineHeight='24px'
          >
            message:{message}
          </Typography>

          <Box mt='30px'>
            <ButtonPrimaryLight size='lg' onClick={() => navigate('/')}>
              Return to Homepage
            </ButtonPrimaryLight>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default OtherError;
