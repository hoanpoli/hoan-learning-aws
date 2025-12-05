import React from 'react';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { neutral, primary } from '@/theme/colors';
import ButtonPrimaryLight from '../Button/ButtonPrimaryLight';

const InterestedBox: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const { programmeId } = useParams();
  
  return (
    <Box bgcolor={primary[50]}>
      <Box maxWidth='1000px' margin='0 auto' p={isMobile ? '60px 30px' : '60px 0px'}>
        <Grid
          container
          gap={isMobile ? 4 : 8}
          margin='0 auto'
          justifyContent='space-between'
        >
          <Grid item md={3.8} lg={3.8} xs={12}>
            <Typography
              fontWeight='600'
              fontSize='24px'
              color={neutral[900]}
              lineHeight='32px'
            >
              Interested to learn more on what we do?
            </Typography>
          </Grid>
          <Grid item md={7} lg={7} xs={12}>
            <Typography color={neutral[600]} lineHeight='24px'>
              We encourage you to explore our wealth of resources available on
              our website. From informative articles to personal stories of
              triumph, these resources are designed to provide valuable insights
              and support to individuals navigating the complexities of breast
              cancer.
            </Typography>
          </Grid>

          <Grid item md={12} xs={12}>
            <Stack direction={isMobile ? 'column' : 'row'} gap={5}>
              <ExploreBox label='Explore Resources' />
              <ExploreBox label='Explore Programmes' />
              <ExploreBox label='Explore Happenings' />
              <Box maxWidth='224px'>
                <ButtonPrimaryLight
                  size='lg'
                  onClick={() => navigate(`/donation?programme=${programmeId}`)}
                  width='100%'
                >
                  Donate Now
                </ButtonPrimaryLight>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

interface ExploreBoxProps {
  label: string;
}

const ExploreBox: React.FC<ExploreBoxProps> = ({ label }) => {
  return (
    <Box
      bgcolor='#fff'
      borderRadius='999px'
      padding='10px 18px'
      maxWidth='188px'
      display='flex'
      justifyContent='center'
    >
      <Typography
        fontWeight='600'
        fontSize='16px'
        lineHeight='24px'
        color='#384250'
      >
        {label}
      </Typography>
    </Box>
  );
};

export default InterestedBox;
