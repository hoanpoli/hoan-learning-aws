import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { CreditCard } from '@phosphor-icons/react';

import { useFormContext } from 'react-hook-form';

import PayNowLogo from '@/assets/payment-logo/PayNow.png';
import PayNowLogoChecked from '@/assets/payment-logo/PayNowChecked-black.png';
import { danger } from '@/theme/colors';
import classes from '../styles/PaymentMethods.module.scss';

interface PaymentMethodsProps {
  error?: string;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ error }) => {
  const { setValue, trigger, watch } = useFormContext();
  const onClick = (value: string) => {
    setValue('paymentMethod', value);
    trigger('paymentMethod');
  };

  return (
    <Box>
      <Typography className={classes.TextLabel}>Payment Method</Typography>
      {!!error && (
        <Typography fontSize='14px' color={danger[500]}>
          {error}
        </Typography>
      )}
      {watch('frequency') === 'One-Time' ? (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
						  onClick={() => onClick('PayNow')}
						  mt={2}
						  className={
                watch('paymentMethod') === 'PayNow'
                  ? classes.BoxActive
                  : classes.BoxInactive
						  }
            >
              <Stack direction='row' gap={3} sx={{ width: '100%' }} alignItems='center'>
                {watch('paymentMethod') === 'PayNow' ? (
                  <img
									  src={PayNowLogoChecked}
									  style={{
									    height: '26px'
									  }}
                  />
                ) : (
                  <img
									  src={PayNowLogo}
									  style={{
									    height: '26px'
									  }}
                  />
                )}

                <Typography
								  className={
                    watch('paymentMethod') === 'PayNow'
                      ? classes.TextActive
                      : classes.TextInactive
								  }
                >
                  PayNow
                </Typography>
              </Stack>
            </Box>
          </Grid>
          {/* TODO: Hide Bank Transfer for now */}
          {/* <Grid item xs={6}>
            <Box
						  onClick={() => onClick('Bank Transfer')}
						  mt={2}
						  className={
                watch('paymentMethod') === 'Bank Transfer'
                  ? classes.BoxActive
                  : classes.BoxInactive
						  }
            >
              <Stack direction='row' gap={3}>
                <Bank
								  size={24}
								  color={
                    watch('paymentMethod') === 'Bank Transfer'
                      ? '#FFF'
                      : '#BD5183'
								  }
                />
                <Typography
								  className={
                    watch('paymentMethod') === 'Bank Transfer'
                      ? classes.TextActive
                      : classes.TextInactive
								  }
                >
                  Bank Transfer
                </Typography>
              </Stack>
            </Box>
          </Grid> */}
          <Grid item xs={6}>
            <Box
						  onClick={() => onClick('Credit Card')}
						  mt={2}
						  className={
                watch('paymentMethod') === 'Credit Card'
                  ? classes.BoxActive
                  : classes.BoxInactive
						  }
            >
              <Stack direction='row' gap={3}>
                <CreditCard
								  size={24}
                  weight='duotone'
                />
                <Typography
								  className={
                    watch('paymentMethod') === 'Credit Card'
                      ? classes.TextActive
                      : classes.TextInactive
								  }
                >
                  Credit Card
                </Typography>
              </Stack>
            </Box>
          </Grid>
          {/* TODO: Hide Cheque for now */}
          {/* <Grid item xs={6}>
            <Box
						  onClick={() => onClick('Cheque')}
						  mt={2}
						  className={
                watch('paymentMethod') === 'Cheque'
                  ? classes.BoxActive
                  : classes.BoxInactive
						  }
            >
              <Stack direction='row' gap={3}>
                <FileText
								  size={24}
								  color={
                    watch('paymentMethod') === 'Cheque' ? '#FFF' : '#BD5183'
								  }
                />
                <Typography
								  className={
                    watch('paymentMethod') === 'Cheque'
                      ? classes.TextActive
                      : classes.TextInactive
								  }
                >
                  Cheque
                </Typography>
              </Stack>
            </Box>
          </Grid> */}
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={6}>
            <Box
						  onClick={() => onClick('Credit Card')}
						  mt={2}
						  className={
                watch('paymentMethod') === 'Credit Card'
                  ? classes.BoxActive
                  : classes.BoxInactive
						  }
            >
              <Stack direction='row' gap={3}>
                <CreditCard
								  size={24}
								  color={
                    watch('paymentMethod') === 'Credit Card'
                      ? '#FFF'
                      : '#BD5183'
								  }
                />
                <Typography
								  className={
                    watch('paymentMethod') === 'Credit Card'
                      ? classes.TextActive
                      : classes.TextInactive
								  }
                >
                  Credit Card
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default PaymentMethods;
