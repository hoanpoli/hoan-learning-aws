import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { Info } from '@phosphor-icons/react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import SingpassLogo from '@/assets/singpass/singpass_logo_white.png';
import CheckboxLabel from '@/components/CheckboxLabel';
import ButtonGroupDonation from '@/components/Donation/ButtonGroupDonation';
import HowMuchDonate from '@/components/Donation/HowMuchDonate';
import ModalTaxDeductionNotice from '@/components/Donation/ModalTaxDeductionNotice';
import type { DonationSetup } from '@/interface/donation.interface';
import { primary, secondary } from '@/theme/colors';
import { donationSetupValidation } from '@/validation/donation/donationSetup.validation';
import { useDonation } from '../hooks/DonationHook';
import BoxAmount from './BoxAmount';
import DonationFrequency from './DonationFrequency';
import PaymentMethods from './PaymentMethods';

interface SetupDonationProps {
  programmeName: string;
}

const SetUpDonation: React.FC<SetupDonationProps> = ({ programmeName }) => {
  const amounts = [10, 50, 100, 500, 1000];
  const isMobile = useMediaQuery('(max-width:800px');

  const [isOpenTaxDeduction, setIsOpenTaxDeduction] = React.useState(false);
  const { donationSetup, nextStep, setDonationSetup } = useDonation();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      frequency: 'One-Time',
      paymentMethod: 'PayNow'
    },
    resolver: yupResolver(donationSetupValidation)
  });

  const {
    formState: { errors },
    setValue,
    watch
  } = methods;

  const onSubmitForm: SubmitHandler<DonationSetup> = (data) => {
    setDonationSetup(data);
    nextStep();
    localStorage.setItem('step', '1');
  };

  const handleOpenModalTaxDeduction = () => setIsOpenTaxDeduction(true);
  const handleCloseModalTaxDeduction = () => setIsOpenTaxDeduction(false);

  const handleConfirmTaxDifferentTaxName = () => {
    handleCloseModalTaxDeduction();
    setValue('isTaxDifferent', true);
  };

  useEffect(() => {
    if (methods.watch('frequency') === 'Recurring') {
      methods.setValue('paymentMethod', 'Credit Card');
    } else {
      methods.setValue('paymentMethod', 'PayNow');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.watch('frequency')]);

  useEffect(() => {
    if (donationSetup) {
      methods.reset(donationSetup);
    }
  }, [donationSetup, methods]);

  return (
    <Box>
      <Stack
        direction='row'
        gap='5px'
        marginTop='24px'
        justifyContent='space-between'
      >
        <img
          src={SingpassLogo}
          alt='Singpass Logo'
          style={{ maxWidth: '96px', maxHeight: '16px' }}
        />
        <Box display='flex' width='60%' flexWrap='wrap' justifyContent='start' textAlign='end' gap='8px'>
          <Typography lineHeight='24px' color={secondary[200]}>
            Donating for:
          </Typography>
          <Typography fontWeight={600} lineHeight='24px' color={primary[100]}>
            {programmeName}
          </Typography>
        </Box>
      </Stack>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitForm)}>
          <DonationFrequency />
          <BoxAmount amounts={amounts} error={errors.amount?.message} />

          <Box mt={4}>
            <Grid container>
              <Grid item md={6}>
                <Controller
                  name='isTaxDeduct'
                  render={({ field: { onChange, value } }) => (
                    <CheckboxLabel
                      onChange={(val) => onChange(val)}
                      checked={value}
                      label='I want to receive Tax Deduction'
                      disabled={watch('amount') < 50}
                    />
                  )}
                />
              </Grid>
              {watch('isTaxDeduct') && (
                <Grid item md={6}>
                  <Controller
                    name='isTaxDifferent'
                    render={({ field: { onChange, value } }) => (
                      <CheckboxLabel
                        onChange={(val) => {
                          if (value) {
                            onChange(val);
                          } else {
                            handleOpenModalTaxDeduction();
                          }
                        }}
                        checked={value}
                        label='Different Tax Recipient'
                      />
                    )}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography
                  sx={{ 
                    color: secondary[200],
                    fontSize: '14px',
                    marginTop: '14px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center'
                  }}
                >
                <Info size={24} />
                Every instance of donation of $50 or above will get a tax deduction receipt.
              </Typography>
              </Grid>
            </Grid>
          </Box>

          <PaymentMethods error={errors.paymentMethod?.message} />

          <HowMuchDonate show={isMobile} />

          <ButtonGroupDonation isBack={false} />
        </form>
      </FormProvider>
      <ModalTaxDeductionNotice
        open={isOpenTaxDeduction}
        handleConfirm={handleConfirmTaxDifferentTaxName}
        handleClose={handleCloseModalTaxDeduction}
      />
    </Box>
  );
};

export default SetUpDonation;
