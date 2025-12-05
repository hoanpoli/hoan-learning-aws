import React from 'react';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { LinkedinLogo, TiktokLogo, YoutubeLogo } from '@phosphor-icons/react';
import WebsiteIcon from '@/assets/icons/website.svg';
import FacebookIcon from '@/assets/success-page/facebook-icon.svg';
import InstagramIcon from '@/assets/success-page/instagram-icon.svg';
import WhatsappIcon from '@/assets/success-page/whatsapp-icon.svg';
import classes from '@/features/donation/styles/SuccessDonationScreen.module.scss';
import { neutral } from '@/theme/colors';

const SocialMedia: React.FC = () => {
  const isMobile = useMediaQuery('((max-width:600px)');
  return (
    <Grid container mt='32px'>
      <Grid item md={6} xs={12}>
        <Box sx={{ textAlign: isMobile ? 'center' : 'none' }}>
          <Typography
            sx={{
              color: neutral[500],
              fontSize: '12px',
              lineHeight: '18px'
            }}
          >
            Our links
          </Typography>
          <Typography
            sx={{
              color: neutral[800],
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: '28px'
            }}
          >
            Follow Our Social media
          </Typography>
        </Box>
      </Grid>
      <Grid item md={6} xs={12} mt={2}>
        <Stack
          direction='row'
          spacing={3}
          sx={{ justifyContent: isMobile ? 'center' : 'end' }}
        >
          <a href='https://www.facebook.com/BreastCancerFoundationSG/' target='_blank' rel='noreferrer'>
            <img src={FacebookIcon} className={classes.SocialMediaIcon} />
          </a>
          <a href='https://www.instagram.com/bcfsg/' target='_blank' rel='noreferrer'>
            <img src={InstagramIcon} className={classes.SocialMediaIcon} />
          </a>
          <a href='https://www.linkedin.com/company/breast-cancer-foundation/' target='_blank' rel='noreferrer'>
            <LinkedinLogo weight='fill' color='#0a66c2' size={20} className={classes.SocialMediaIcon} />
          </a>
          <a href='https://www.tiktok.com/@breastcancerfoundation' target='_blank' rel='noreferrer'>
            <TiktokLogo weight='fill' color='black' size={20} className={classes.SocialMediaIcon} />
          </a>
          <a href='https://www.youtube.com/@BreastCancerFoundationSG' target='_blank' rel='noreferrer'>
            <YoutubeLogo weight='fill' color='red' size={20} className={classes.SocialMediaIcon} />
          </a>
          <a href='https://wa.me/+6596953264' target='_blank' rel='noreferrer'>
            <img src={WhatsappIcon} className={classes.SocialMediaIcon} />
          </a>
          <a href='https://bcf.org.sg/' target='_blank' rel='noreferrer'>
            <img src={WebsiteIcon} className={classes.SocialMediaIcon} />
          </a>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SocialMedia;
