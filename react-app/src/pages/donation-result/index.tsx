import React, { lazy, Suspense, useState } from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import LoadingComponent from '@/components/Loading';
import ErrorPage from '@/features/error';
import useDonationResult from '@/hooks/useDonationResult';
import type {
  CustomError,
  DonationResult as DonationResponse
} from '@/interface/donation.interface';

const DonationResultScreen = lazy(() => import('@/features/donation/donation-result'));

export interface ErrorResponse {
  message?: string;
  status?: number;
}

const DonationResult: React.FC = () => {
  const { donationNumber } = useParams();
  const [data, setData] = useState<DonationResponse | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const onSuccess = (data: DonationResponse) => {
    setData(data);
    setError(null);
  };

  const onError = (error: CustomError) => {
    setData(null);
    setError({
      message: error.response.data?.message,
      status: error.response.data?.error_code
    });
  };

  const { isError, isLoading } = useDonationResult(
    donationNumber || '',
    onSuccess,
    onError
  );

  if (isError) {
    return (
      <ErrorPage status={error?.status || 404} message={error?.message || ''} />
    );
  }

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <Box>
      <Helmet>
        <title>Donation Result Page</title>
      </Helmet>
      <Suspense fallback={<LoadingComponent />}>
        <DonationResultScreen donation={data?.donation} />
      </Suspense>
    </Box>
  );
};

export default DonationResult;
