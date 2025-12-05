import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// Static imports
import packageJson from '../package.json';
import ProgrammeDetails from './features/programme/views/ProgrammeDetails';
import Layout from './layout';
import AutoScrollToTop from './layout/AutoScrollToTop';
import DonationPage from './pages/donation-page';
import DonationResult from './pages/donation-result';
import FinalizeDonationPage from './pages/finalize-donation';
import NotFoundPage from './pages/not-found-page';
import ProgrammePage from './pages/programme';
import StripeCancellationPage from './pages/stripe-cancellation';

function App() {
  useEffect(() => {
    (() => {
      const version = localStorage.getItem('version');
      if (version !== packageJson.version) {
        if ('caches' in window) {
          caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach((name) => {
              caches.delete(name);
            });
          });

          window.location.reload();
        }

        localStorage.clear();
        localStorage.setItem('version', packageJson.version);
      }
    })();
  }, []);

  return (
    <Layout>
      <AutoScrollToTop />
      <Routes>
        <Route path='/' element={<ProgrammePage />} />
        <Route path='/programme/:programmeId' element={<ProgrammeDetails />} />
        <Route path='/donation' element={<DonationPage />} />
        <Route path='/donation-failed' element={<StripeCancellationPage />} />
        <Route
          path='/finalize-donation/:donationId'
          element={<FinalizeDonationPage />}
        />
        <Route
          path='/donate-result/:donationNumber'
          element={<DonationResult />}
        />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
