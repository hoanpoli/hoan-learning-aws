import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { Controller, useFormContext } from 'react-hook-form';

import InputFloating from '@/components/InputFloating';
import Select from '@/components/Select';
import type { DonationCategoriesType } from '@/interface/donation.interface';
import { secondary } from '@/theme/colors';
import { validationMaxCharacters } from '@/utils/formattingCharacters';
import { useDonation } from '../../hooks/DonationHook';
const AnonymousForm: React.FC = () => {
  const {
    control,
    formState: { errors },
    register,
    watch
  } = useFormContext();

  const { setDonationProfile } = useDonation();

  const handleChangeRemarks = (value: string, onChange: (_e: string) => void) => {
    onChange(validationMaxCharacters(value, 200));
  }

  useEffect(() => {
    setDonationProfile({
      name: watch('name'),
      salutation: watch('salutation'),
      donorType: watch('donorType') as DonationCategoriesType,
      orgName: watch('orgName')
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('donorType')]);

  const howDoYouKnow = watch('howYouKnow');

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputFloating
            label='Email Address'
            type='email'
            {...register('email')}
          />
          <Typography
            color={secondary[200]}
            fontSize={14}
            mt={1}
            fontWeight={400}
          >
            Email is optional
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Select
            label='How do you know about us?'
            options={[
              { label: 'Social Media', value: 'Social Media' },
              { label: 'Friend', value: 'Friend' },
              { label: 'Others', value: 'Others' }
            ]}
            required
            {...register('howYouKnow')}
            value={howDoYouKnow || ''}
            defaultValue={howDoYouKnow || ''}
            error={!!errors?.howYouKnow?.message}
            helperText={errors?.howYouKnow?.message}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            control={control} 
            name='remarks'
            render={({ field: { onChange, value } }) => (
              <InputFloating
                label='Remarks'
                onChange={(e) => handleChangeRemarks(e.target.value, onChange)}
                value={value}
                error={!!errors?.remarks?.message}
                helperText={errors?.remarks?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnonymousForm;
