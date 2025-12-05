import { useQuery } from 'react-query';
import { getDonation } from '@/api/donation';
import type { CustomError, DonationResult } from '@/interface/donation.interface';

type OnSuccessCallback = (_data: DonationResult) => void;
type OnErrorCallback = (_error: CustomError) => void;

const useDonationResult = (donationNumber: string, onSuccess: OnSuccessCallback, onError: OnErrorCallback) => {
  const queryFn = async () => {
    const fetchDonationResult = await getDonation(donationNumber);
    return fetchDonationResult.data;
  };

  return useQuery(
    ['donation-result', donationNumber],
    queryFn,
    {
      onSuccess,
      onError,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false
    }
  );
};

export default useDonationResult;
