import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';

import { Controller, useFormContext } from 'react-hook-form';

import InputFloating from '@/components/InputFloating';
import { danger } from '@/theme/colors';
import { amountValidation } from '@/utils/formattingCharacters';
import { useDonation } from '../hooks/DonationHook';
import classes from '../styles/BoxAmount.module.scss';

export interface BoxAmountProps {
  amounts?: number[];
  error?: string;
}

const BoxAmount: React.FC<BoxAmountProps> = ({ amounts, error }) => {
  const { setAmount } = useDonation();
  const [customAmount, setCustomAmount] = useState<boolean>(false);

  const isMobile = useMediaQuery('(max-width:600px)');

  const { control, setValue, trigger, watch } = useFormContext();

  const triggerAmountUpdate = useCallback(
    (value: number) => {
      setValue('amount', value);
      trigger('amount');
      setAmount(value);

      setValue('otherAmount', 0);
      if(value < 50) {
        setValue('isTaxDeduct', false);
      }

      if(value !== 0) {
        setCustomAmount(false);
      }
    },
    [setValue, trigger, setAmount]
  );

  const triggerOtherAmountUpdate = useCallback((
    value: number) => {
    setValue('otherAmount', value);
    setAmount(value);
    setAmount(value);
    setValue('amount', value);
    setValue('oldAmount', value);
    if(value < 50) {
      setValue('isTaxDeduct', false);
    }
  },[setValue, setAmount]);

  const onClick = useCallback(
    (value: number) => {
      triggerAmountUpdate(value);
    },
    [triggerAmountUpdate]
  );

  const activeCustomInput = () => {
    if(!customAmount) {
      setCustomAmount(true);
      triggerAmountUpdate(0);
    }
  };

  const handleChageCustomAmount = (value: string, onChange: (_value: string) => void) => {
    onChange(amountValidation(value));
  }

  useEffect(() => {
    if(watch('otherAmount')) {
      triggerOtherAmountUpdate(watch('otherAmount'));
      if(isMobile) {
        setCustomAmount(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('otherAmount')]);

  const amountButtons = amounts?.map((amount: number, index) => (
    <Grid item lg={2.3} md={5} xs={3.8} key={index}>
      <Box
        mb={3}
        onClick={() => onClick(amount)}
        className={
          !watch('otherAmount') && amount === watch('amount') && !customAmount
            ? classes.BoxActive
            : classes.BoxInactive
        }
      >
        <Typography className={classes.TextAmount}>{`S$${amount}`}</Typography>
      </Box>
    </Grid>
  ));

  const customAmountInput = (isMobile && customAmount) || !isMobile ? (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Controller 
          name='otherAmount'
          control={control}
          render={({field: {onChange, value}}) => (
            <InputFloating
              label='Other Amount'
              startIcon='S$'
              onChange={(e) => handleChageCustomAmount(e.target.value, onChange)}
              value={value}
              type='number'
            />
          )}
        />
      </Grid>
    </Grid>
  ) : null;

  return (
    <Box>
      <Typography className={classes.TextLabel}>
        Select the amount you’d like to donate:
      </Typography>
      {!!error && (
        <Typography color={danger[500]} fontSize='14px'>
          {error}
        </Typography>
      )}
      <Grid
        container
        gap={1}
        columnGap={isMobile ? 2 : 1}
        justifyContent='center'
      >
        {amountButtons}
        {isMobile && (
          <Grid item lg={2.3} md={5} xs={3.8}>
            <Box
              mb={3}
              onClick={activeCustomInput}
              className={customAmount ? classes.BoxActive : classes.BoxInactive}
            >
              <Typography className={classes.TextAmount}>Custom</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      {customAmountInput}
    </Box>
  );
};

export default BoxAmount;
