import React from 'react';
import { Box, Container, Stack, useMediaQuery } from '@mui/material';

import dayjs from 'dayjs';
import DummyCardImage from '@/assets/programme/programme-img-2.png';
import LoadingComponent from '@/components/Loading';
import CardFeaturedProgramme from '@/components/Programme/CardFeaturedProgramme';
import type { ProgrammesData } from '@/interface/programme.interface';

export interface FeaturedProgrammeCardProps {
  featuredProgramme: ProgrammesData[];
  isLoading: boolean;
  error?: string;
}

const FeaturedProgrammeCard: React.FC<FeaturedProgrammeCardProps> = ({
  error,
  featuredProgramme,
  isLoading
}) => {
  const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY');
  const isMobile = useMediaQuery('(max-width:1000px)');

  if (isLoading) {
    return <LoadingComponent />;
  }

  if(error) {
    return <Box display='flex' justifyContent='center'>{error}</Box>;
  }

  return (
    <Container maxWidth='lg' sx={{ padding: '0 20px', zIndex: 1 }}>
      <Box>
        <Stack
          direction='row'
          spacing={5}
          // justifyContent={'center'}
          overflow={isMobile ? 'scroll' : 'unset'}
        >
          {featuredProgramme.map((item) => (
            <CardFeaturedProgramme
              key={item.Id}
              totalProgramme={featuredProgramme.length}
              currentDonate={item.Actual_Donation_Amt__c || 0}
              date={`${formatDate(item.Start_Date_Time__c)} - ${formatDate(item.End_Date_Time__c)}` as string}
              desc={item.Programme_Description__c || ''}
              goalOfDonate={item.Fundraising_Target__c || 0}
              id={item.Id}
              image={item.Programme_Event_Banner__c || DummyCardImage}
              programmeName={item.Name}
              valueDonate={item.Achievement__c || 0}
              liveDonation={item.Live_Donation_Detail__c}
            />
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default FeaturedProgrammeCard;
