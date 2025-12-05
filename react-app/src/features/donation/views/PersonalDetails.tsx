import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { Question, User, UsersThree } from '@phosphor-icons/react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import SingPassBtn from '@/assets/singpass/singpass_button.png';
import SingPassLogo from '@/assets/singpass/singpass_logo_white.png';
import CheckboxLabel from '@/components/CheckboxLabel';

import BoxDonateAmount from '@/components/Donation/BoxDonateAmount';
import ButtonGroupDonation from '@/components/Donation/ButtonGroupDonation';
import { useDonation } from '@/features/donation/hooks/DonationHook';
import useSingPass from '@/hooks/useSingPass';
import type {
  DonationCategoriesType,
  PersonalDetails as PersonalDetailsType
} from '@/interface/donation.interface';
import { danger, neutral, primary, secondary } from '@/theme/colors';
import { personalDetailValidation } from '@/validation/donation/personalDetails.validation';
import classes from '../styles/PersonalDetails.module.scss';
import AnonymousForm from './forms/AnonymousForm';
import IndividualForm from './forms/IndividualForm';
import OrganisationForm from './forms/OrganisationForm';
import SuccessNotificationSingpass from './SuccessNotificationSingpass';

const PersonalDetails: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:800px)');
  
  const searchParams = new URLSearchParams(window.location.search);
  const [enableAuth, setEnableAuth] = React.useState(false);
  const { getAuth, getPerson } = useSingPass();
  const codeParam = searchParams.get('code');
  const stateParam = searchParams.get('state');

  const salutation = sessionStorage.getItem('salutation');
  const isDifferentTaxRecipient = sessionStorage.getItem(
    'isDifferentTaxRecipient'
  );
  const remarks = sessionStorage.getItem('remarks');
  const howYouKnow = sessionStorage.getItem('howYouKnow');
  const isAgree = sessionStorage.getItem('isAgree');
  const isUpdateNewsletter = sessionStorage.getItem('isUpdateNewsletter');

  const { data: singPassAuth } = getAuth({
    enable: enableAuth
  });

  const { data: personData } = getPerson({
    code_verifier: sessionStorage.getItem('code_verifier'),
    nonce: sessionStorage.getItem('nonce'),
    state: sessionStorage.getItem('state'),
    paramCode: codeParam,
    paramState: stateParam
  });

  const {
    donationSetup,
    nextStep,
    personalDetails,
    previousStep,
    setPersonalDetails
  } = useDonation();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      donorType: 'Individual',
      isUpdateNewsletter: true
    },
    resolver: yupResolver(personalDetailValidation)
  });

  const {
    clearErrors,
    control,
    formState,
    handleSubmit,
    reset,
    setValue,
    watch
  } = methods;
  const error = formState.errors;

  useEffect(() => {
    if(donationSetup?.isTaxDeduct) {
      methods.setValue('isTaxDeduct', donationSetup.isTaxDeduct);
    }

    if(donationSetup?.isTaxDifferent) {
      methods.setValue('isDifferentTaxRecipient', donationSetup.isTaxDifferent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[donationSetup])

  const entityType = [
    {
      label: 'Individual',
      value: 'Individual',
      icon: <User size={20} />
    },
    {
      label: 'Organisation',
      value: 'Organisation',
      icon: <UsersThree size={25} />
    },
    {
      label: 'Anonymous',
      value: 'Anonymous',
      icon: <Question size={20} />
    }
  ];

  const onSubmit: SubmitHandler<PersonalDetailsType> = (
    data: PersonalDetailsType
  ) => {
    setPersonalDetails(data);
    nextStep();
  };

  useEffect(() => {
    if (personalDetails) {
      reset(personalDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('donorType')]);

  const checkAuth = () => {
    setEnableAuth(true);
    sessionStorage.setItem('salutation', watch('salutation') || '');
    sessionStorage.setItem('howYouKnow', watch('howYouKnow'));
    sessionStorage.setItem('remarks', watch('remarks') || '');
    sessionStorage.setItem('isAgree', (watch('isAgree') || false).toString());
    sessionStorage.setItem(
      'isUpdateNewsletter',
      (watch('isUpdateNewsletter') || false).toString()
    );
  };

  useEffect(() => {
    if (singPassAuth) {
      window.location.href = singPassAuth.authorizationUrl;
      sessionStorage.setItem('code_verifier', singPassAuth.code_verifier);
      sessionStorage.setItem('nonce', singPassAuth.nonce);
      sessionStorage.setItem('state', singPassAuth.state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singPassAuth]);

  useEffect(() => {
    if (personData) {
      setValue('address', personData.regadd.street.value);
      setValue('email', personData.email.value);
      setValue('unitNumber', personData.regadd.unit.value);
      setValue('postalCode', personData.regadd.postal.value);
      setValue('taxRecipientId', personData.uinfin.value);
      setValue('name', personData.name.value);
      setValue('isSingpass', true);
    }else {
      setValue('isSingpass', false);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personData]);

  useEffect(() => {
    if (salutation) {
      setValue('salutation', salutation);
    }

    if (howYouKnow) {
      setValue('howYouKnow', howYouKnow);
    }

    if (remarks) {
      setValue('remarks', remarks);
    }

    if (isAgree) {
      setValue('isAgree', isAgree === 'true' ? true : false);
    }

    if (isUpdateNewsletter) {
      setValue(
        'isUpdateNewsletter',
        isUpdateNewsletter === 'true' ? true : false
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    salutation,
    howYouKnow,
    isDifferentTaxRecipient,
    remarks,
    isAgree,
    isUpdateNewsletter
  ]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} my={3}>
          {!donationSetup?.isTaxDifferent && watch('donorType') === 'Individual' && (
            <Grid item xs={12}>
              <Box
                borderBottom={`1px solid ${neutral[200]}`}
                pb='16px'
                mb='16px'
              >
                <Stack direction='row' justifyContent='space-between'>
                  <Box>
                    <img
                      src={SingPassLogo}
                      alt='SingPass Logo'
                      style={{ height: '16px' }}
                    />
                    <Typography
                      color={secondary[200]}
                      fontSize='14px'
                      lineHeight='20px'
                      mt='8px'
                    >
                      Speed up the process with the Singpass, making your
                      donation more convenient!
                    </Typography>
                  </Box>
                  <Box sx={{ cursor: 'pointer' }} onClick={checkAuth}>
                    <img
                      src={SingPassBtn}
                      alt='SingPass Button'
                      style={{ height: '48px', width: '100%' }}
                    />
                  </Box>
                </Stack>
              </Box>
            </Grid>
          )}
          <Grid item xs={12} style={{ display: personData ? 'block' : 'none' }}>
            <SuccessNotificationSingpass />
          </Grid>
          <Grid item md={2} xs={12} alignSelf='center'>
            <Typography className={classes.TextEntityType}>
              Entity Type
            </Typography>
          </Grid>
          <Grid item md={10} xs={12}>
            <Stack direction={isMobile ? 'column' : 'row'} gap={2}>
              {entityType.map((item, index) => {
                return donationSetup?.frequency === 'One-Time' ||
                  item.value !== 'Anonymous' ? (
                  <Box
                    key={index}
                    onClick={() =>
                      setValue(
                        'donorType',
                        item.value as DonationCategoriesType
                      )
                    }
                    borderRadius='12px'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    padding='8px 14px'
                    width={isMobile ? 'auto' : '100%'}
                    color={secondary[800]}
                    bgcolor={
                      watch('donorType') === item.value
                        ? primary[100]
                        : secondary[50]
                    }
                  >
                    {item.icon}
                    <Typography ml={2} fontWeight={600}>
                      {item.label}
                    </Typography>
                  </Box>
                  ) : null;
              })}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box mt={5}>
              {watch('donorType') === 'Individual' ? (
                <IndividualForm />
              ) : watch('donorType') === 'Organisation' ? (
                <OrganisationForm />
              ) : watch('donorType') === 'Anonymous' ? (
                <AnonymousForm />
              ) : null}
            </Box>
            <Grid container mt={3}>
              <Grid item md={6}>
                <Controller
                  control={control}
                  name='isAgree'
                  render={({ field: { onChange } }) => (
                    <>
                      <CheckboxLabel
                        onChange={(val) => onChange(val)}
                        checked={watch('isAgree')}
                        label='I agree with the privacy statement'
                      />
                      {!!error.isAgree?.message && (
                        <Typography fontSize='14px' color={danger[500]}>
                          {error.isAgree?.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <Controller
                  name='isUpdateNewsletter'
                  render={({ field: { onChange, value } }) => (
                    <CheckboxLabel
                      onChange={(val) => onChange(val)}
                      checked={value}
                      label='Keep me updated with BCF newsletter'
                    />
                  )}
                />
              </Grid>
            </Grid>

            <BoxDonateAmount
              show={isMobile}
              amount={donationSetup?.amount || 0}
              donorType={watch('donorType')}
              name={watch('name')}
              salutation={watch('salutation')}
              orgName={watch('orgName')}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonGroupDonation onClickBack={previousStep} />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default PersonalDetails;
