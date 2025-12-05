import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import LoadingComponent from '@/components/Loading';

const ProgrammeScreen = lazy(() => import('@/features/programme/programme'));

const ProgrammePage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Fundraising Page</title>
      </Helmet>
      <Suspense fallback={<LoadingComponent />}>
        <ProgrammeScreen />
      </Suspense>
    </div>
  );
};

export default ProgrammePage;
