import React from 'react';
import {
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import type {
  FrequencyType,
  PaymentMethods
} from '@/interface/donation.interface';
import { neutral, primary, secondary } from '@/theme/colors';

interface DonationDetailProps {
  amount?: number;
  donationNumber?: string;
  date?: string;
  frequency?: FrequencyType;
  paymentMethod?: PaymentMethods;
  status?: 'donation-success' | 'donation-failed';
}

const DonationDetails: React.FC<DonationDetailProps> = ({
  amount,
  date,
  donationNumber,
  frequency,
  paymentMethod,
  status = 'donation-success'
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Grid container spacing={3} marginY='30px'>
      <Grid item xs={12}>
        <Typography
          color={neutral[900]}
          fontSize={isMobile ? '16px' : '24px'}
          fontWeight='600'
          lineHeight={isMobile ? '24px' : '32px'}
        >
          Donation Details
        </Typography>
      </Grid>
      <Grid item md={3} xs={12}>
        <Box
          color={secondary[800]}
          padding='18px 20px'
          borderRadius='12px'
          border={
            status === 'donation-success' ? 'none' : `1px solid ${primary[300]}`
          }
          bgcolor={status === 'donation-success' ? primary[100] : '#fff'}
          textAlign={isMobile ? 'center' : 'left'}
        >
          <Typography
            lineHeight='20px'
            fontSize='14px'
            // color={status === 'donation-success' ? '#fff' : secondary[800]}
          >
            Donation Amount
          </Typography>
          <Typography
            fontSize='24px'
            fontWeight='700'
            lineHeight='32px'
            // color={status === 'donation-success' ? '#fff' : neutral[900]}
          >
            S$ {amount || 0}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={9} xs={12}>
        {
          !isMobile &&
          <Box
            padding='20px'
            borderRadius='12px'
            border={`1px solid ${primary[300]}`}
            bgcolor='#FFF'
            display='flex'
            justifyContent='space-between'
          >
            <Box textAlign='left'>
              <Column
                isMobile={isMobile}
                isDonationNumber
                title='Donation No.'
                value={donationNumber}
                status={status}
              />
            </Box>
            
            <Box>
              <Stack direction='row' gap={8}>
                <Column isMobile={isMobile} title='Date' value={date} />

                <Column isMobile={isMobile} title='Frequency' value={frequency} />

                <Column
                  isMobile={isMobile}
                  title='Payment Method'
                  value={paymentMethod}
                />
              </Stack>
            </Box>
          </Box>
        }
        {
          isMobile &&
          <Box 
            padding='20px'
            borderRadius='12px'
            border={`1px solid ${primary[300]}`}
            bgcolor='#FFF'
          >
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Column
                  isMobile={isMobile}
                  isDonationNumber
                  title='Donation No.'
                  value={donationNumber}
                  status={status}
                />
              </Grid>
              <Grid item xs={6}>
                <Column isMobile={isMobile} title='Date' value={date} />
              </Grid>
              <Grid item xs={6}>
                <Column isMobile={isMobile} title='Frequency' value={frequency} />
              </Grid>
              <Grid item xs={6}>
                <Column
                  isMobile={isMobile}
                  title='Payment Method'
                  value={paymentMethod}
                />
              </Grid>
            </Grid>
          </Box>
        }
      </Grid>
    </Grid>
  );
};

interface ColumnProps {
  title: string;
  value?: string;
  isMobile: boolean;
  isDonationNumber?: boolean;
  status?: 'donation-success' | 'donation-failed';
}

const Column: React.FC<ColumnProps> = ({
  isDonationNumber = false,
  isMobile,
  status = 'donation-success',
  title,
  value
}) => {
  return (
    <Stack>
      <Typography
        fontSize='14px'
        color='#6C737F'
        lineHeight='20px'
        textAlign={isMobile || isDonationNumber ? 'start' : 'end'}
      >
        {title}
      </Typography>
      <Typography
        textAlign={isMobile || isDonationNumber ? 'start' : 'end'}
        fontSize={(isDonationNumber && !isMobile) ? '18px' : '14px'}
        fontWeight={(isDonationNumber && !isMobile) ? '600' : '500'}
        lineHeight='28px'
      >
        {status === 'donation-failed' ? (
          <Stack direction='row' gap={3}>
            {value || '-'}
            <Chip
              label='FAILED'
              color='error'
              sx={{
                fontSize: '12px'
              }}
            />
          </Stack>
        ) : (
          value || '-'
        )}
      </Typography>
    </Stack>
  );
};

export default DonationDetails;
