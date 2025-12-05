import React from 'react';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { Heart } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import StripeCancellationImage from '@/assets/illustration/stripe-cancellation.svg';
import ButtonNeutral from '@/components/Button/ButtonNeutral';
import ButtonPrimaryLight from '@/components/Button/ButtonPrimaryLight';
import { secondary } from '@/theme/colors';

const StripeCancellation: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const isLarge = useMediaQuery('(min-height:1240px)');
  const isXLarge = useMediaQuery('(min-height:1440px)');

  return (
    <Box bgcolor={secondary[800]}>
      <Stack
        alignItems='center'
        gap='24px'
        p='20px'
        margin='0 auto'
        width='fit-content'
        py={isMobile ? '50px' : '100px'}
        maxWidth='800px'
        justifyContent='center'
        height={isLarge || isXLarge ? (isXLarge ? '52.5vh' : '45.72vh') : '100%'}
      >
        <img
          src={StripeCancellationImage}
          style={{ width: 'min(100%, 250px)' }}
          alt='Stripe Cancellation Image'
        />
        <Typography
          fontWeight='500'
          fontSize='36px'
          color={secondary[50]}
          lineHeight='44px'
          letterSpacing='-2%'
          textAlign='center'
        >
          Oops! it looks like you didn’t complete your donation
        </Typography>

        <Typography textAlign='center' color={secondary[200]} lineHeight='24px'>
          No worries—things happen!
        </Typography>

        <Typography color={secondary[200]} lineHeight='24px' textAlign='center'>
          To complete your donation, you'll need to go through the steps again.
          Simply click the button below to restart the process. Your generosity
          truly makes a difference, and we appreciate your support!
        </Typography>
        <Stack direction='row' gap='16px' mt='32px' justifyContent='center'>
          <ButtonNeutral size='lg' onClick={() => navigate('/')}>
            Back to home
          </ButtonNeutral>
          <ButtonPrimaryLight size='lg' onClick={() => navigate('/donate')}>
            <Heart size='18px' style={{ marginRight: '6px' }} />
            Retry Donation
          </ButtonPrimaryLight>
        </Stack>
      </Stack>
    </Box>
  );
};

export default StripeCancellation;
