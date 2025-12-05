import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';

import { Controller, useFormContext } from 'react-hook-form';

import InputFloating from '@/components/InputFloating';
import Select from '@/components/Select';
import { validationMaxCharacters } from '@/utils/formattingCharacters';
import { useDonation } from '../../hooks/DonationHook';

const OrganisationForm: React.FC = () => {

  const {donationSetup, setDonationProfile} = useDonation();
  const {
    control,
    formState: { errors },
    register,
    watch
  } = useFormContext();

  const handleChangeAddress = (value: string, onChange: (_e: string) => void) => {
    onChange(validationMaxCharacters(value, 100));
  }

  const handleChangeRemarks = (value: string, onChange: (_e: string) => void) => {
    onChange(validationMaxCharacters(value, 200));
  }

  const handleChangeOrgName = (value: string, onChange: (_e: string) => void) => {
    onChange(validationMaxCharacters(value, 50));
  }

  useEffect(() => {
    if (watch('orgName') !== '') {
      setDonationProfile({
        orgName: watch('orgName'),
        donorType: watch('donorType')
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('donorType'), watch('orgName')]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <InputFloating
					  label='Email Address'
					  required
					  type='email'
					  {...register('email')}
					  error={!!errors?.email?.message}
					  helperText={errors?.email?.message}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputFloating
					  label='Contact Person'
					  required
					  {...register('contactPerson')}
					  error={!!errors?.contactPerson?.message}
					  helperText={errors?.contactPerson?.message}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Controller 
            control={control}
            name='orgName'
            render={({ field: { onChange, value } }) => (
              <InputFloating
                label='Organisation Name'
                required
                onChange={ (e) => handleChangeOrgName(e.target.value, onChange) }
                value={value}
                error={!!errors?.orgName?.message}
                helperText={errors?.orgName?.message}
              />
            )}
          />
        </Grid>
        {donationSetup?.isTaxDeduct && (
          <Grid item sm={12} xs={12}>
            <InputFloating
						  label='UEN No.'
						  required
						  {...register('taxRecipientId')}
						  error={!!errors?.taxRecipientId?.message}
						  helperText={errors?.taxRecipientId?.message}
            />
          </Grid>
        )}
        <Grid item sm={3} xs={6}>
          <InputFloating
					  label='Postal Code'
					  {...register('postalCode')}
					  error={!!errors?.postalCode?.message}
					  helperText={errors?.postalCode?.message}
          />
        </Grid>
        <Grid item sm={4} xs={6}>
          <InputFloating label='Unit Number' {...register('unitNumber')} />
        </Grid>
        <Grid item sm={5} xs={12}>
          <Controller 
            name='address'
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputFloating 
                label='Address'
                onChange={(e) => handleChangeAddress(e.target.value, onChange)}
                value={value}
              />
            )}
          /> 
        </Grid>
        <Grid item sm={6} xs={12}>
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
        <Grid item sm={6} xs={12}>
          <Controller 
            name='remarks'
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputFloating 
                label='Remarks' 
                onChange={ (e) => handleChangeRemarks(e.target.value, onChange) }
                value={value}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrganisationForm;
