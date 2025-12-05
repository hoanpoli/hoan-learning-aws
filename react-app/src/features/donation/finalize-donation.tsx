import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  CircularProgress,
  Container,
  Typography
} from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import ButtonPrimaryLight from '@/components/Button/ButtonPrimaryLight';
import BoxBannerDonation from '@/components/DonationResult/BoxBannerDonation';
import DonationDetails from '@/components/DonationResult/DonationDetail';
import ModalConfirmation from '@/components/FinalizeDonation/ModalConfirmation';
import type { IListBank } from '@/components/FinalizeDonation/PaymentInstruction';
import PaymentInstruction from '@/components/FinalizeDonation/PaymentInstruction';
import LoadingComponent from '@/components/Loading';
import useGetBanks from '@/hooks/useGetBanks';
import { useMutationFinalize } from '@/hooks/useMutationFinalize';
import type { CustomError, listBanks } from '@/interface/donation.interface';
import { primary } from '@/theme/colors';
import { finalizeValidation } from '@/validation/donation/finalize.validate';

const FinalizeDonation: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { state } = useLocation();
  const { donationId } = useParams();
  const paymentMethod = state?.paymentMethod;
  const { isLoading, mutate } = useMutationFinalize();
  const [listBank, setListBank] = useState<IListBank[]>([]);

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(finalizeValidation),
    defaultValues: {
      paymentMethod: paymentMethod
    }
  });

  useEffect(() => {
    if (paymentMethod) {
      methods.setValue('paymentMethod', paymentMethod);
    }
  }, [paymentMethod, methods]);

  const [error, setError] = useState<string | null>(null);
  const onSuccess = (data: listBanks) => {
    setListBank(
      data.banks.map((item) => ({
        label: item,
        value: item
      }))
    );
    setError(null);
  };

  const onError = (error: CustomError) => {
    setError(error.response.data?.message || '');
    setListBank([]);
  };

  const {
    isError,
    isLoading: isLoadingBank,
    refetch
  } = useGetBanks(onSuccess, onError);

  const errors = methods.formState.errors;

  const errorPayments = {
    referenceNo: errors.referenceNo?.message,
    bankName: errors.bankName?.message,
    chequeNo: errors.chequeNo?.message
  };

  const handleOnClose = () => {
    setModalOpen(false);
  };

  const onSelectBank = (value: string) => {
    if (methods.watch('bankName') === value) {
      methods.setValue('bankName', '');
      methods.trigger('bankName');
    } else {
      methods.setValue('bankName', value);
      methods.trigger('bankName');
    }
  };

  const onSubmitForm = () => {
    setModalOpen(true);
  };

  const onSendFinalizeData = () => {
    const data = {
      bankName: methods.watch('bankName'),
      chequeNo: methods.watch('chequeNo'),
      referenceNo: methods.watch('referenceNo')
    };

    if (paymentMethod !== 'PayNow') {
      mutate([donationId || '', data]);
    } else if (paymentMethod !== 'Bank Transfer') {
      mutate([donationId || '', { referenceNo: methods.watch('referenceNo') }]);
    } else {
      mutate([donationId || '', {}]);
    }

    handleOnClose();
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingBank) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Box>{error}</Box>;
  }

  return (
    <Box bgcolor={primary[25]}>
      <BoxBannerDonation type='finalize' />

      <Container maxWidth='lg'>
        <Box maxWidth='800px' margin='0 auto' py='50px' px='30px'>
          <DonationDetails
            amount={state?.amount}
            date={state?.date}
            donationNumber={state?.donationNumber}
            frequency={state?.frequency}
            paymentMethod={state?.paymentMethod}
          />

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitForm)}>
              <PaymentInstruction
                paymentMethod={paymentMethod}
                onSelectBank={onSelectBank}
                amount={state?.amount}
                donationId={donationId || ''}
                errors={errorPayments}
                listBank={listBank}
              />

              <Typography
                sx={{
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: '28px',
                  color: '#1F2A37'
                }}
              >
                Have you done the transaction? Please let us know
              </Typography>
              <Box mt={3} mb='60px' textAlign='center'>
                <ButtonPrimaryLight
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress sx={{ color: '#fff' }} />
                  ) : paymentMethod !== 'PayNow' ? (
                    'Continue'
                  ) : (
                    'Confirm'
                  )}
                </ButtonPrimaryLight>
              </Box>
            </form>
          </FormProvider>
        </Box>

        <ModalConfirmation
          open={modalOpen}
          onClose={handleOnClose}
          bankName={methods.watch('bankName') || 'DBS Bank Limited'}
          chequeNo={methods.watch('chequeNo')}
          name={state?.name}
          paymentMethod={paymentMethod}
          onSubmit={onSendFinalizeData}
        />
      </Container>
    </Box>
  );
};

export default FinalizeDonation;
