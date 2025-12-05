import React, { useMemo } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import DonationImage1 from '@/assets/donation-form/banner-10-may.png';
import BoxDonateAmount from '@/components/Donation/BoxDonateAmount';
import BoxDoubleAmount from '@/components/Donation/BoxDoubleAmount';
import HowMuchDonate from '@/components/Donation/HowMuchDonate';
import Render from '@/components/Render';
import Stepper from '@/components/Stepper';
import useGetProgrammeByAdCode from '@/hooks/useGetProgrammeByAdCode';
import type { CustomError } from '@/interface/donation.interface';
import { primary, secondary } from '@/theme/colors';
import { useDonation } from './hooks/DonationHook';
import PersonalDetails from './views/PersonalDetails';
import SetUpDonation from './views/SetUpDonation';
import Summary from './views/Summary';

const DonationScreen: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:800px)');
  const {
    amount,
    donationProfile,
    donationStep,
    doubleDonation,
    isDoubleAmount
  } = useDonation();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const programmeId = searchParams.get('programme') || '';
  const adCode = searchParams.get('adv') || '';

  const { data, error, isError, isLoading } = useGetProgrammeByAdCode(
    programmeId,
    adCode
  );

  const programmeName = useMemo(
    () => data?.programme.Name,
    [data?.programme.Name]
  );

  const getBackground = (double?: boolean, step?: number) => {
    if (!double || step !== 2) {
      return DonationImage1;
    } else if (double) {
      return DonationImage1;
    } else {
      return '';
    }
  };

  const backgroundImg = getBackground(isDoubleAmount, donationStep);

  if (isError && (programmeId !== '' || adCode !== '')) {
    const errors = error as CustomError;
    return errors?.response.data?.message;
  }

  return (
    <Box sx={{ padding: isMobile ? '20px 0' : '75px 0', background: secondary[800] }}>
      <Container maxWidth='xl'>
        <Grid container spacing={5} minHeight='800px'>
          {isLoading && (programmeId !== '' || adCode !== '') ? (
            <Grid item md={12} sm={12}>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <CircularProgress sx={{ color: 'white' }} />
              </Box>
            </Grid>
          ) : (
            <>
              <Grid item md={7} sm={12}>
                <Stack
                  height='100%'
                  padding={
                    isMobile ? '12px' : '24px 64px 0px 112px'
                  }
                >
                  <Typography
                    sx={{
                      color: primary[100],
                      fontSize: '24px',
                      fontWeight: 400,
                      lineHeight: '32px',
                      fontFamily: 'Bree Serif'
                    }}
                  >
                    Let's make an impact!
                  </Typography>

                  <Stepper activeStep={donationStep} />

                  {donationStep === 0 ? (
                    <SetUpDonation
                      programmeName={programmeName || 'General Donation'}
                    />
                  ) : donationStep === 1 ? (
                    <PersonalDetails />
                  ) : (
                    donationStep === 2 && <Summary />
                  )}
                </Stack>
              </Grid>
              <Grid
                item
                md={4.5}
                sm={12}
                position='relative'
                sx={{
                  background: secondary[700],
                  borderRadius: '24px'
                }}
                padding='16px'
              >
                <Box>
                  <img
                    src={backgroundImg}
                    alt='banner'
                    style={{
                      objectFit: 'cover',
                      borderRadius: '8px',
                      height: '100%',
                      maxHeight: '800px',
                      width: '100%',
                      maxWidth: '568px'
                    }}
                  />
                  <Stack
                    justifyContent='end'
                    height='100%'
                    gap={3}
                    position='absolute'
                    top='0'
                    padding='0 24px'
                  >
                    {/* Box doubled amount */}
                    <BoxDoubleAmount
                      show={!isMobile && donationStep === 2}
                      isDoubleAmount={isDoubleAmount}
                      onClickDoubleDonation={doubleDonation}
                    />
                    {/* Box Donate Amount */}
                    <BoxDonateAmount
                      amount={amount}
                      donorType={donationProfile?.donorType}
                      salutation={donationProfile?.salutation}
                      name={donationProfile?.name}
                      orgName={donationProfile?.orgName}
                      show={!isMobile}
                    />
                    <Render in={amount === 0}>
                      {/* Box How Much Donate */}
                      <HowMuchDonate show={!isMobile} />
                    </Render>
                  </Stack>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default DonationScreen;
