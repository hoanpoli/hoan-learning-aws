import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import LoadingComponent from '@/components/Loading';

const StripeCancellationScreen = lazy(
  () => import('@/features/donation/stripe-cancellation')
);

const StripeCancellationPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Stripe Cancellation Page</title>
      </Helmet>
      <Suspense fallback={<LoadingComponent />}>
        <StripeCancellationScreen />
      </Suspense>
    </div>
  );
};

export default StripeCancellationPage;
