import React, { useMemo } from 'react';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { ArrowLeft, Note } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

import DummyImage from '@/assets/programme/programme-img-1.png';
import LoadingComponent from '@/components/Loading';
import Notification from '@/components/Notification';
import BoxDonationData from '@/components/Programme/BoxDonationData';
import DescriptionSection from '@/components/Programme/DescriptionSection';
import InterestedBox from '@/components/Programme/InterestedBox';
import SupportProgramSection from '@/components/Programme/SupportProgramSection';
import OtherError from '@/features/error/other-error';
import useGetProgrammeDetail from '@/hooks/useGetProgrammeDetail';
import type { CustomError } from '@/interface/donation.interface';
import type { ProgrammeStatus } from '@/interface/programme.interface';

import NotFoundPage from '@/pages/not-found-page';
import { neutral, primary, secondary } from '@/theme/colors';

const ProgrammeDetails: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const { programmeId } = useParams();

  const { data, error, isError, isLoading } = useGetProgrammeDetail(
    programmeId || ''
  );

  const programmeDetails = useMemo(() => data?.programme, [data?.programme]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    const errors = error as CustomError;
    if (errors?.response.status === 404) {
      return <NotFoundPage />;
    } else {
      return (
        <OtherError
          message={errors?.message || ''}
          status={errors?.response.status || 500}
        />
      );
    }
  }

  return (
    <Box
      sx={{ 
        background: primary[25]
      }}
    >
      <Box
        maxWidth='1000px'
        margin={isMobile ? '0 auto 30px auto' : '0 auto 100px auto'}
        padding={isMobile ? '0 30px' : '0 50px'}
      >
        <Grid container gap={8} justifyContent='space-between'>
          {/* title and button back */}
          <Grid item md={12}>
            <Stack
              mt='32px'
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <ArrowLeft size='20px' color={neutral[600]} />
              <Typography
                fontWeight='600'
                lineHeight='20px'
                color={neutral[600]}
              >
                Return to Programmes
              </Typography>
            </Stack>
            <Box mt='24px'>
              <Typography
                fontSize='16px'
                fontWeight='600'
                lineHeight='24px'
                color={primary[300]}
              >
                Programme
              </Typography>
              <Typography
                mt='9px'
                fontSize='24px'
                fontWeight='600'
                lineHeight='32px'
                color={neutral[900]}
              >
                {programmeDetails?.Name}
              </Typography>
            </Box>
          </Grid>

          {/* notification section */}
          {programmeDetails?.Programme_Stage_Formula__c === 'Planned' && (
            <Grid item md={12}>
              <Notification
                title='This programme is coming soon!'
                message='Please come back later once the programme has started, or you can make a general donation!'
                buttonLabel='Make General Donation'
                href='/donation'
              />
            </Grid>
          )}

          {programmeDetails?.Programme_Stage_Formula__c === 'Ended' && (
            <Grid item md={12}>
              <Notification
                title='This programme has concluded'
                message='Sorry this programme has concluded, you can still make a general donation if you wish!'
                buttonLabel='Make General Donation'
                href='/donation'
              />
            </Grid>
          )}

          {/* content section */}
          <Grid item md={8} xs={12}>
            <Box
              overflow='hidden'
              height='280px'
              borderRadius='16px'
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
                <img
                  src={programmeDetails?.Programme_Event_Banner__c || DummyImage}
                  style={{
                    width: '100%'
                  }}
                />
            </Box>

            {/* Description for date and donation */}
            <BoxDonationData
              currentDonation={programmeDetails?.Actual_Donation_Amt__c}
              goalDonation={programmeDetails?.Fundraising_Target__c}
              percentage={programmeDetails?.Achievement__c}
              startDate={programmeDetails?.Start_Date_Time__c}
              endDate={programmeDetails?.End_Date_Time__c}
              liveDonation={programmeDetails?.Live_Donation_Detail__c}
            />

            {/* Desc of programme */}

            <Stack direction='row' gap='16px' mt='24px' alignItems='start'>
              <Box width='auto'>
                <Box
                  sx={{
                    background: secondary[50],
                    width: '32px!important',
                    height: '32px!important',
                    borderRadius: '999px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Note size='16px' color='#73A4AC' />
                </Box>
              </Box>

              <Stack gap='8px'>
                <Typography
                  color={neutral[900]}
                  fontWeight='600'
                  fontSize='18px'
                >
                  Overview
                </Typography>

                {programmeDetails?.Overview__c ? (
                  <div dangerouslySetInnerHTML={{ __html: programmeDetails?.Overview__c || '-' }} />
                )
                  : '-'
                }

                <DescriptionSection
                  title='Why It Matters'
                  description={programmeDetails?.Why_it_Matters__c || '-'}
                />

                {programmeDetails?.Venue__c && (
                  <DescriptionSection
                    title='Your Impact'
                    description={programmeDetails?.Your_Impact__c || '-'}
                  />
                )}
              </Stack>
            </Stack>
          </Grid>

          <Grid item md={3} mb={isMobile ? 10 : 0}>
            {/* targetDate use format YYYY-MM-DD */}
            <SupportProgramSection
              status={
                programmeDetails?.Programme_Stage_Formula__c as ProgrammeStatus
              }
              onClick={() =>
                navigate(`/donation?programme=${programmeDetails?.Id}`)
              }
              targetDate={dayjs(programmeDetails?.Start_Date_Time__c).format(
                'YYYY-MM-DDThh:mm'
              )}
            />
          </Grid>
        </Grid>

        {/* section interested to learn */}
      </Box>
      <InterestedBox />
    </Box>
  );
};

export default ProgrammeDetails;
