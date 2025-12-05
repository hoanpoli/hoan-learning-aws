import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorImg from '@/assets/404-error.png';
import ButtonPrimaryLight from '@/components/Button/ButtonPrimaryLight';
import { secondary } from '@/theme/colors';

const NotFound = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isLarge = useMediaQuery('(min-height:1240px)');
  const isXLarge = useMediaQuery('(min-height:1440px)');
  const navigate = useNavigate();

  return (
    <Box bgcolor={secondary[800]}>
      <Stack
        alignItems='center'
        justifyContent='center'
        gap='24px'
        p='20px'
        margin='0 auto'
        py={isMobile ? '50px' : '100px'}
        maxWidth='800px'
        height={isLarge ? isXLarge ? '52.153vh' : '45.75vh' : '100%'}
      >
        <img src={ErrorImg} style={{ width: 'min(100%, 250px)' }} />
        <Typography
          fontWeight='500'
          fontSize='36px'
          color={secondary[50]}
          lineHeight='44px'
          letterSpacing='-2%'
        >
          Oops, looks like you’re lost..
        </Typography>

        <Typography color={secondary[200]} lineHeight='24px' textAlign='center'>
          It seems the page you're trying to access doesn't exist. Let's guide
          you back to the right path. Click the button down below to return to
          our homepage and continue exploring.
        </Typography>
        <Box textAlign='center' mt='32px'>
          <ButtonPrimaryLight size='lg' onClick={() => navigate('/')}>
            Return to Homepage
          </ButtonPrimaryLight>
        </Box>
      </Stack>
    </Box>
  );
};

export default NotFound;
