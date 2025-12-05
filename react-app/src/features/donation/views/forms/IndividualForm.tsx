import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';

import { Controller, useFormContext } from 'react-hook-form';

import InputFloating from '@/components/InputFloating';
import Select from '@/components/Select';
import useGetSalutation from '@/hooks/useGetSalutation';
import type {
  CustomError,
  listSalutations
} from '@/interface/donation.interface';
import { fullnameValidation, validationMaxCharacters } from '@/utils/formattingCharacters';
import { useDonation } from '../../hooks/DonationHook';

interface IListSalutations {
  label: string;
  value: string;
}

const IndividualForm: React.FC = () => {
  const {
    control,
    formState: { errors },
    register,
    watch
  } = useFormContext();

  const [listsOfSalutation, setListOfSalutation] = useState<IListSalutations[]>(
    []
  );

  const [error, setError] = useState<string | null>(null);
  const onSuccess = (data: listSalutations) => {
    setListOfSalutation(
      data.salutations.map((item) => ({
        label: item,
        value: item
      }))
    );
    setError(null);
  };

  const onError = (error: CustomError) => {
    setError(error.response.data?.message || '');
    setListOfSalutation([]);
  };

  const { data, isError, isLoading } = useGetSalutation(onSuccess, onError);

  const { donationSetup, setDonationProfile } = useDonation();

  const handleChangeFullname = (value: string, onChange: (_e: string) => void) => {
    onChange(fullnameValidation(value));
  }

  const handleChangeAddress = (value: string, onChange: (_e: string) => void) => {
    onChange(validationMaxCharacters(value, 100));
  }

  const handleChangeRemarks = (value: string, onChange: (_e: string) => void) => {
    onChange(validationMaxCharacters(value, 200));
  }

  useEffect(() => {
    if (watch('salutation') !== '' && watch('name') !== '') {
      setDonationProfile({
        name: watch('name'),
        salutation: watch('salutation'),
        donorType: watch('donorType')
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('salutation'), watch('name'), watch('donorType')]);

  useEffect(() => {
    if (
      data &&
      data?.salutations.length !== 0 &&
      listsOfSalutation.length === 0
    ) {
      onSuccess(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    );
  }

  if (isError) {
    return <Box>{error}</Box>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <InputFloating
          label='Email Address'
          type='email'
          required
          {...register('email')}
          value={watch('email')}
          defaultValue={watch('email')}
          error={!!errors?.email?.message}
          helperText={errors?.email?.message}
          disabled={!!watch('isSingpass')}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <Select
          label='Salutation'
          required
          options={listsOfSalutation}
          {...register('salutation')}
          value={watch('salutation') || ''}
          defaultValue={watch('salutation') || ''}
          error={!!errors?.salutation?.message}
          helperText={errors?.salutation?.message}
        />
      </Grid>
      <Grid item md={9} xs={12}>
        <Controller 
          name='name'
          control={control}
          render={({field: {onChange, value}}) => (
            <InputFloating
              label='Full Name as NRIC'
              required
              error={!!errors?.name?.message}
              helperText={errors?.name?.message}
              disabled={!!watch('isSingpass')}
              onChange={(e) => handleChangeFullname(e.target.value, onChange)}
              value={value}
            />
          )}
        />
      </Grid>
      {donationSetup?.isTaxDeduct && (
        <>
          <Grid item md={donationSetup.isTaxDifferent ? 6 : 12} xs={12}>
            <Controller 
              name='taxRecipientId'
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFloating
                  label='Tax Recipient ID No. (NRIC/FIN)'
                  required
                  onChange={(e) => onChange(e.target.value.toUpperCase())}
                  value={value}
                  error={!!errors?.taxRecipientId?.message}
                  helperText={errors?.taxRecipientId?.message}
                  disabled={!!watch('isSingpass')}
                />
              )}
            />
          </Grid>
          {donationSetup.isTaxDifferent && (
              <Grid item md={6} xs={12}>
                <InputFloating
                  label='Tax Recipient Name'
                  required
                  {...register('taxRecipientName')}
                  error={!!errors?.taxRecipientName?.message}
                  helperText={errors?.taxRecipientName?.message}
                />
              </Grid>
          )}
          
        </>
      )}

      <Grid item md={4} xs={6}>
        <InputFloating
          label='Postal Code'
          {...register('postalCode')}
          error={!!errors?.postalCode?.message}
          helperText={errors?.postalCode?.message}
          disabled={!!watch('isSingpass')}

        />
      </Grid>
      <Grid item md={3} xs={6}>
        <InputFloating
          label='Unit Number'
          {...register('unitNumber')}
          error={!!errors?.unitNumber?.message}
          helperText={errors?.unitNumber?.message}
          disabled={!!watch('isSingpass')}
        />
      </Grid>
      <Grid item md={5} xs={12}>
        <Controller 
          control={control}
          name='address'
          render={({field: {onChange, value}}) => (
            <InputFloating
              label='Address'
              error={!!errors?.address?.message}
              helperText={errors?.address?.message}
              disabled={!!watch('isSingpass')}
              value={value}
              onChange={(e) => handleChangeAddress(e.target.value, onChange)}
            />
          )}
        />
      </Grid>
      <Grid item md={5} xs={12}>
        <Select
          label='How do you know about us?'
          options={[
            { label: 'Social Media', value: 'Social Media' },
            { label: 'Friend', value: 'Friend' },
            { label: 'Others', value: 'Others' }
          ]}
          required
          {...register('howYouKnow')}
          value={watch('howYouKnow') || ''}
          defaultValue={watch('howYouKnow') || ''}
          error={!!errors?.howYouKnow?.message}
          helperText={errors?.howYouKnow?.message}
        />
      </Grid>
      <Grid item md={7} xs={12}>
        <Controller 
          control={control}
          name='remarks'
          render={({field: {onChange, value}}) => (
            <InputFloating 
              label='Remarks' 
              onChange={(e) => handleChangeRemarks(e.target.value, onChange)}
              value={value}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default IndividualForm;
