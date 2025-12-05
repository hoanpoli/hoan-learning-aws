import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { HandHeart } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import ButtonPrimaryLight from '@/components/Button/ButtonPrimaryLight';
import BoxBannerDonation from '@/components/DonationResult/BoxBannerDonation';
import DonationDetails from '@/components/DonationResult/DonationDetail';
import InterestedBox from '@/components/DonationResult/InterestedBox';
import PersonalDetails from '@/components/DonationResult/PersonalDetails';
import SocialMedia from '@/components/DonationResult/SocialMedia';
import type {
  DonationResult,
  FrequencyType,
  PaymentMethods
} from '@/interface/donation.interface';
import { neutral, primary } from '@/theme/colors';

type statusTypes = 'donation-success' | 'donation-failed';

const DonationResultScreen: React.FC<DonationResult> = ({ donation }) => {
  const getStatus = (status: string | undefined): statusTypes => {
    if (
      status === 'Cancelled' ||
      status === 'Terminated' ||
      status === 'Declined'
    ) {
      return 'donation-failed';
    } else {
      return 'donation-success';
    }
  };

  const status = getStatus(donation?.Donation_Status__c);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  return (
    <Box bgcolor={primary[25]}>
      <BoxBannerDonation type={status} />

      <Box maxWidth='800px' margin='0 auto' paddingX={isMobile ? '30px' : '30px'} py='50px'>
        <DonationDetails
          amount={donation?.Amount_Entered__c}
          date={donation?.Donation_Date__c}
          donationNumber={donation?.Name}
          frequency={donation?.Frequency_Type_Entered__c as FrequencyType}
          paymentMethod={donation?.Payment_Method_Entered__c as PaymentMethods}
          status={status}
        />

        {status !== 'donation-failed' ? (
          <>
            <PersonalDetails donation={donation} />
            <SocialMedia />
          </>
        ) : (
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap='30px'
            marginBottom='50px'
          >
            <Box
              border={`1px solid ${neutral[300]}`}
              bgcolor='#fff'
              p='20px'
              textAlign='center'
              borderRadius='12px'
            >
              <Typography color={neutral[900]}>
                Your donation is really important to us because it helps to
                continue our valuable work. Without you we could not do this.
                Please feel free to contact support if you need further
                assistance.
              </Typography>
            </Box>

            <ButtonPrimaryLight size='lg' onClick={() => navigate('/donation')}>
              Return to Donation
              <HandHeart size='18px' style={{ marginLeft: '5px' }} />
            </ButtonPrimaryLight>
          </Box>
        )}
      </Box>
      
      {status === 'donation-success' ? <InterestedBox /> : null} 
    </Box>
  );
};

export default DonationResultScreen;
