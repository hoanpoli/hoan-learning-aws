import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { MagnifyingGlass } from '@phosphor-icons/react';

import dayjs from 'dayjs';
import DummyCardImage2 from '@/assets/programme/programme-img-1.png';
import InputFloating from '@/components/InputFloating';
import LoadingComponent from '@/components/Loading';
import CardOngoingProgramme from '@/components/Programme/CardOngoingProgramme';
import PaginationComp from '@/components/Programme/PaginationComp';
import type { ProgrammesData } from '@/interface/programme.interface';
import { neutral, primary, secondary } from '@/theme/colors';

interface programmesProps {
  programmes: ProgrammesData[];
  page: number;
  totalPage: number;
  gotoNext: () => void;
  gotoPrev: () => void;
  onSearchChange: (_value: string) => void;
  isLoading: boolean;
  error?: string;
}

const OnGoingCard: React.FC<programmesProps> = ({
  error,
  gotoNext,
  gotoPrev,
  isLoading,
  onSearchChange,
  page,
  programmes,
  totalPage
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const [searchText, setSearchText] = useState<string>('');
  const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearchChange(searchText);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div style={{ padding: '20px', height: '100%', background: primary[50] }}>
      <Container maxWidth='lg'>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Stack
              direction='row'
              justifyContent='space-between'
              mt='32px'
              mb='40px'
            >
              <Box>
                <Typography
                  variant='body1'
                  color={secondary[500]}
                  fontWeight={500}
                >
                  ONGOING DONATION PROGRAMMES
                </Typography>
                <Typography fontSize='30px' mt='8px' fontFamily='Bree Serif'>
                  Let’s check out our other programmes
                </Typography>
              </Box>
              <Box alignSelf='center'>
                {!isMobile && (
                  <InputFloating
                    label='Search programme name...'
                    startIcon={<MagnifyingGlass size='24px' />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                )}
              </Box>
            </Stack>
          </Grid>
          {programmes.length > 0 &&
            !isLoading &&
            programmes.map((item, index) => (
              <Grid item md={6} xs={12} key={index}>
                <CardOngoingProgramme
                  image={item.Programme_Event_Banner__c || DummyCardImage2}
                  currentDonate={item.Actual_Donation_Amt__c}
                  date={`${formatDate(item.Start_Date_Time__c)} - ${formatDate(item.End_Date_Time__c)}` as string}
                  desc={item.Programme_Description__c}
                  goalOfDonate={item.Fundraising_Target__c}
                  liveDonation={item.Live_Donation_Detail__c}
                  id={item.Id}
                  programmeName={item.Name}
                />
              </Grid>
            ))}
          <Grid xs={12} item>
            {programmes.length === 0 && !isLoading && (
              <Typography
                textAlign='center'
                marginTop='50px'
                marginBottom='50px'
                color={neutral[500]}
                fontSize='20px'
              >
                There are no programmes
              </Typography>
            )}

            {programmes.length > 0 && (
              <PaginationComp
                gotoNext={gotoNext}
                gotoPrev={gotoPrev}
                page={page}
                totalPage={totalPage}
              />
            )}
            {isLoading && <LoadingComponent />}
            {error && (
              <Box display='flex' justifyContent='center' marginTop='50px'>
                {error}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default OnGoingCard;
