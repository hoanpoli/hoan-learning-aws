import React, { lazy, Suspense } from 'react';

import { Helmet } from 'react-helmet';
import LoadingComponent from '@/components/Loading';

const FinalizeDonationScreen = lazy(() => import('@/features/donation/finalize-donation'));

const FinalizeDonationPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Donation Finalize Page</title>
      </Helmet>
      <Suspense fallback={<LoadingComponent />}>
        <FinalizeDonationScreen />
      </Suspense>
    </div>
  );
};

export default FinalizeDonationPage;
