import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { primary, secondary } from '@/theme/colors';

interface ColumnDonationProps {
  title: string;
  value?: string | number;
  isDoubleAmount?: boolean;
}

const ColumnDonation: React.FC<ColumnDonationProps> = ({ isDoubleAmount, title, value }) => {
  return (
    <Box>
      <Typography lineHeight='24px' color={secondary[200]}>
        {title}
      </Typography>
      {typeof value !== 'number' ? (
        <Typography mt={1} fontWeight='500' lineHeight='24px' color={secondary[50]}>
          {value}
        </Typography>
      ) : (
        <Stack direction='row' gap={3}>
          <Typography mt={1} fontWeight='500' lineHeight='24px' color={secondary[50]}>
            S$ {value}
          </Typography>
          {isDoubleAmount && (
            <Typography mt={1} fontWeight='600' lineHeight='24px' color={primary[200]}>
              Doubled!
            </Typography>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default ColumnDonation;
