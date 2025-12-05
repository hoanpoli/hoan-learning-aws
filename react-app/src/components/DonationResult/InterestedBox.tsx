import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import classes from '@/features/donation/styles/SuccessDonationScreen.module.scss';
import ButtonNeutral from '../Button/ButtonNeutral';
import ButtonPrimaryLight from '../Button/ButtonPrimaryLight';

const InterestedBox = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  return (
    <Box bgcolor='#FFEEF6'>
      <Box
        maxWidth='1000px'
        marginX='auto'
        marginTop='50px'
        paddingY='60px'
        px={isMobile ? '20px' : '30px'}
      >
        <Grid container justifyContent='space-between'>
          <Grid item md={4}>
            <Typography
              className={
                isMobile ? classes.DescriptionMobile : classes.Description
              }
            >
              Interested in knowing more about your impact?
            </Typography>
          </Grid>
          <Grid item md={8}>
            <Typography
              className={
                isMobile ? classes.SubDescriptionMobile : classes.SubDescription
              }
            >
              We encourage you to explore our wealth of resources available on
              our website. From informative articles to personal stories of
              triumph, these resources are designed to provide valuable insights
              and support to individuals navigating the complexities of breast
              cancer.
            </Typography>
          </Grid>
        </Grid>

        <Stack direction='row' spacing={3} mt={6}>
            <ButtonNeutral onClick={() => navigate('/')}>
              <Typography className={classes.ExploreProgrammeText}>
                Back To Home
              </Typography>
            </ButtonNeutral>
          
            <ButtonPrimaryLight
              onClick={() => navigate('/donation')}
            >
              <Typography className={classes.ExploreProgrammeText}>
                Donate Again
              </Typography>
            </ButtonPrimaryLight>
        </Stack>
      </Box>
    </Box>
  );
};

export default InterestedBox;
