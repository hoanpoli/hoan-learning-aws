import type { Theme } from '@mui/material';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { HandHeart, HandTap, WarningCircle } from '@phosphor-icons/react';
import SuccessLogoHeader from '@/assets/donation-form/success-logo-header.png';
import { neutral, primary, secondary } from '@/theme/colors';

type PageTypes = 'finalize' | 'donation-success' | 'donation-failed';
interface BoxBannerDonationProps {
  type: PageTypes;
}

const BoxBannerDonation: React.FC<BoxBannerDonationProps> = ({ type }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const getIcon = (page: PageTypes) => {
    if (page === 'finalize') {
      return (
        <HandTap
          size={isMobile ? '42px' : '42px'}
          color={primary[200]}
          style={{
            padding: isMobile ? '10px' : '16px',
            borderRadius: '999px',
            backgroundColor: secondary[700]
          }}
        />
      );
    } else if (page === 'donation-success') {
      return (
        <Box
          sx={{
            backgroundImage: `url(${SuccessLogoHeader})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '10px 15px'
          }}
          textAlign='center'
        >
          <HandHeart
            weight='duotone'
            size={isMobile ? '40px' : '38px'}
            color={primary[300]}
            style={{
              padding: isMobile ? '10px' : '16px',
              borderRadius: '999px',
              backgroundColor: secondary[50]
            }}
          />
        </Box>
      );
    } else {
      return (
        <WarningCircle
          size={isMobile ? '40px' : '42px'}
          color='#FF3D40'
          style={{
            padding: isMobile ? '10px' : '16px',
            borderRadius: '999px',
            backgroundColor: '#FFF'
          }}
        />
      );
    }
  };

  const getTitle = (page: PageTypes) => {
    if (page === 'finalize') {
      return 'Thank you for your donation, let’s finalize it!';
    } else if (page === 'donation-success') {
      return 'Thank you for your donation to our cause!';
    } else {
      return 'Sorry, your donation is unsuccessful!';
    }
  };

  const getMessage = (page: PageTypes) => {
    if (page === 'finalize') {
      return 'Please follow the instruction, once you are done please confirm the donation';
    } else if (page === 'donation-success') {
      return (
        <>
          With your donation, you’ve helped{' '}
          <span style={{ color: primary[100], fontWeight: 600 }}>3 people</span>{' '}
          suffering from breast cancer!
        </>
      );
    } else {
      return 'There seems to be an error with your donation because of [reason]';
    }
  };

  const icon = getIcon(type);
  const title = getTitle(type);
  const message = getMessage(type);
  return (
    <Box
      borderBottom={`1px solid ${neutral[200]}`}
      bgcolor={
        type === 'donation-success'
          ? secondary[600]
          : type === 'donation-failed'
            ? primary[50]
            : secondary[800]
      }
    >
      <Box
        padding={isMobile ? '20px' : '48px 30px'}
        margin='0 auto'
        maxWidth='1000px'
      >
        <Grid container gap={isMobile ? 2 : 6}>
          <Grid item md={1.5} xs={3} alignSelf={'center'}>
            {icon}
          </Grid>
          <Grid item md={5} xs={12}>
            <Typography
              fontFamily='Bree Serif'
              color={type === 'donation-failed' ? neutral[900] : primary[100]}
              fontSize={isMobile ? '20px' : '36px'}
              lineHeight={isMobile ? '30px' : '44px'}
              letterSpacing={isMobile ? 0 : '-0.72px'}
              maxWidth='480px'
            >
              {title}
            </Typography>
          </Grid>
          <Grid item md={4.5} xs={12} alignSelf='center'>
            <Typography
              color={
                type === 'donation-success'
                  ? secondary[50]
                  : type === 'donation-failed'
                    ? neutral[600]
                    : secondary[200]
              }
              fontSize={isMobile ? '14px' : '16px'}
              lineHeight='24px'
              maxWidth='386px'
            >
              {message}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BoxBannerDonation;
