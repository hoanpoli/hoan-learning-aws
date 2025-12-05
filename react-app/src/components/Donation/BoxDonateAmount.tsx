import React from 'react';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { HandHeart, Square } from '@phosphor-icons/react';
import { donationMessage } from '@/features/donation/data/donation';
import { useDonation } from '@/features/donation/hooks/DonationHook';
import { primary } from '@/theme/colors';

interface DonateAmountProps {
  amount: number;
  donorType?: string;
  salutation?: string;
  name?: string;
  orgName?: string;
  show?: boolean;
}

const BoxDonateAmount: React.FC<DonateAmountProps> = ({
  amount,
  donorType,
  name,
  orgName,
  salutation,
  show = true
}) => {
  const isMobile = useMediaQuery('(max-width:800px)');
  const [messageId, setMessageId] = React.useState<number>(Math.floor(Math.random() * 3));
  const {donationStep} = useDonation();

  const generateRandomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const generateUnixNumber = (currentId: number) => {
    const num = generateRandomNumber(0, 2);
    if(num === currentId) {
      generateUnixNumber(num);
    }else {
      setMessageId(num);
    }

  }

  const message = donationMessage.find((item) => item.id === messageId);

  React.useEffect(() => {
    generateUnixNumber(messageId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[donationStep]);

  return (
    <Box mb='50px'>
      {show && amount > 0 && (
        <Box
          display={show && amount > 0 ? 'flex' : 'none'}
          ml={isMobile ? 0 : '15px'}
          mr={isMobile ? 0 : '20px'}
          flexDirection={isMobile ? 'column' : 'row'}
          alignItems='top'          
          marginTop={isMobile ? '12px' : 0}
        >
          <Square 
            fill={isMobile ? primary[50] : primary[50]} 
            weight='fill' 
            size='24' 
            style={{ rotate: '50deg', marginTop: '20px' }} 
          />

          <Box
            marginTop={isMobile ? '-35px' : '0'}
            borderRadius='24px'
            marginLeft={isMobile ? '8px' : '-8px'}
            padding='20px'
            sx={{
              backgroundColor: primary[50],
              backdropFilter: isMobile ? 'none' : 'blur(20px)'
            }}
          >
            <Stack direction='row' spacing={2}>
              <Box>
                <HandHeart
                  size={24}
                  color={primary[300]}
                  weight='duotone'
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.50)',
                    padding: '8px',
                    borderRadius: '12px'
                  }}
                />
              </Box>
              <Box>
                <Typography fontWeight={500} color={primary[500]}>S$ {amount}</Typography>
                <Typography
                  color={primary[800]}
                  fontSize={isMobile ? '12px' : '16px'}
                  fontWeight='600'
                  lineHeight='24px'
                >
                  {message?.message || ''}
                </Typography>

                {donorType && (
                  <Typography
                    color={primary[900]}
                    fontSize={isMobile ? '12px' : '16px'}
                    lineHeight='18px'
                    pt='8px'
                  >
                    {donorType === 'Anonymous' && 'Thank you for your support!'}
                    {donorType === 'Individual' &&
                      name !== '' &&
                      `Thank you, ${salutation || ''} ${name || ''}`}
                    {donorType === 'Organisation' && `Thank you, ${orgName}`}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BoxDonateAmount;
