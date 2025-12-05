import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';

import LoadingComponent from '@/components/Loading';
const DonationScreen = lazy(() => import('@/features/donation'));

const DonationPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>
          Donation - Breast Cancer Foundation (BCF) | Breast Cancer Support
        </title>
      </Helmet>
      <Suspense fallback={<LoadingComponent />}>
        <DonationScreen />
      </Suspense>
    </>
  );
};

export default DonationPage;
