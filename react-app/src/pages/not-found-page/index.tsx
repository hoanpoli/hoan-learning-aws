import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import LoadingComponent from '@/components/Loading';

const NotFound = lazy(() => import('@/features/error/not-found'));

const NotFoundPage = () => {
  return (
    <div>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <Suspense fallback={<LoadingComponent />}>
        <NotFound />
      </Suspense>
    </div>
  );
};

export default NotFoundPage;
