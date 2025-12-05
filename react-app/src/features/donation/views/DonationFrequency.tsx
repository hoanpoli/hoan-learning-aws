import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { HandHeart } from '@phosphor-icons/react';
import { useFormContext } from 'react-hook-form';

import classes from '../styles/DonationFrequency.module.scss';

const DonationFrequency: React.FC = () => {
  const { clearErrors, setValue, watch } = useFormContext();

  const onClick = (value: string) => {
    setValue('frequency', value);
    if (value === 'Recurring') {
      clearErrors('paymentMethod');
    }
  };

  return (
    <>
      <Typography mb={2} className={classes.TextLabel}>
        How often would you like to donate?
      </Typography>
      <Grid container mb={4} spacing={2}>
        <Grid item md={6} xs={12}>
          <Box
            onClick={() => onClick('One-Time')}
            className={
              watch('frequency') === 'One-Time'
                ? classes.BoxActive
                : classes.BoxInactive
            }
          >
            <Stack direction='row' gap={3}>
              <div className={classes.IconText}>
                <HandHeart
                  size={24}
                  weight={
                    watch('frequency') === 'One-Time' ? 'duotone' : 'regular'
                  }
                />
              </div>
              <Typography className={classes.TextBox}>
                One-Time Donation
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box
            onClick={() => onClick('Recurring')}
            className={
              watch('frequency') === 'Recurring'
                ? classes.BoxActive
                : classes.BoxInactive
            }
          >
            <Stack direction='row' gap={3}>
              <div className={classes.IconText}>
                <HandHeart
                  size={24}
                  weight={
                    watch('frequency') === 'Recurring' ? 'duotone' : 'regular'
                  }
                />
              </div>
              <Typography className={classes.TextBox}>
                Monthly Donation
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DonationFrequency;
