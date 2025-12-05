import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { neutral } from '@/theme/colors';

interface PayNowInstructionProps {
  donationId: string;
}

const PayNowInstruction: React.FC<PayNowInstructionProps> = ({
  donationId
}) => {
  const { hostname, protocol } = window.location;
  const instructions = [
    'If you\'re on mobile: Save the QR code image and use "Scan and Pay" in your banking app.',
    'Otherwise: Scan the QR code directly with your mobile banking app.',
    'You can also donate manually by entering the UEN (provided below).'
  ];

  return (
    <Box
      padding='20px'
      bgcolor='#fff'
      border={`1px solid ${neutral[200]}`}
      display='flex'
      gap='24px'
      borderRadius='12px'
      flexWrap='wrap'
      justifyContent='center'
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        // padding='12px'
        borderRadius='18px'
        width='280px'
        height='280px'
        bgcolor='#FFF'
        border={`1px solid ${neutral[300]}`}
      >
        <img src={`${protocol}//${hostname}/api/paynow/${donationId}`} />
      </Box>
      <Box maxWidth='436px'>
        <Typography
          color={neutral[700]}
          fontSize='14px'
          lineHeight='20px'
          fontWeight={600}
        >
          What's next?
        </Typography>
        <Box
          sx={{
            color: neutral[600],
            fontSize: '14px'
          }}
        >
          <ul style={{ paddingLeft: '18px' }}>
            {instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ul>
        </Box>
        <Stack gap={3}>
          <Column label='UEN Number' value='S97SS0137LB03' />
          <Column label='Company Name' value='Breast Cancer Foundation' />
          <Column label='Reference Field' value='2312-001122' />
        </Stack>
      </Box>
    </Box>
  );
};

interface ColumnProps {
  label: string;
  value: string;
}

const Column: React.FC<ColumnProps> = ({ label, value }) => {
  return (
    <Typography
      fontWeight='600'
      fontSize='14px'
      lineHeight='20px'
      color={neutral[900]}
    >
      <Grid container>
        <Grid item xs={4}>
          {label}
        </Grid>
        <Grid item xs={0.5}>
          :
        </Grid>
        <Grid item xs={6.5}>
          {value}{' '}
        </Grid>
      </Grid>
    </Typography>
  );
};

export default PayNowInstruction;
