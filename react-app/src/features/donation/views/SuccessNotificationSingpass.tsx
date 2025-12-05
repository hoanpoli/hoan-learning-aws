import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { CheckCircle } from '@phosphor-icons/react';
import { secondary, success } from '@/theme/colors';

const SuccessNotificationSingpass: React.FC = () => {
  return (
    <Box
      border={`solid 1px ${secondary[700]}`}
      bgcolor={secondary[700]}
      borderRadius='8px'
      py='12px'
      px='16px'
      mb='16px'
    >
      <Stack direction='row' alignItems='start' gap='10px'>
        <CheckCircle color={success[400]} size={24} />
        <Box display='flex' flexDirection='column'>
          <Typography color={success[400]} fontWeight={600} fontSize={14}>
            Singpass data successfully retrieved!
          </Typography>
          <Typography color='#8CB9B6' fontSize={14}>
            If you wish to change your entity type to Organisation or Anonymous,
            please refresh the page.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SuccessNotificationSingpass;
