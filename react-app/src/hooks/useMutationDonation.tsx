import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { sendDonation } from '@/api/donation';
import { useDonation } from '@/features/donation/hooks/DonationHook';
import type { DonationResponse } from '@/interface/donation.interface';

export const useMutationDonation = () => {
  const navigate = useNavigate();
  const { donationSetup, personalDetails, reset } = useDonation();

  return useMutation({
    mutationKey: 'create-donation',
    mutationFn: sendDonation,
    onSuccess: (res) => {
      const response = res.data as DonationResponse;
      if (
        donationSetup?.paymentMethod === 'Credit Card' ||
        // deploy on production without this condition
        donationSetup?.paymentMethod === 'PayNow'
      ) {
        window.location.href = response?.session || '';
      } else {
        navigate(`/finalize-donation/${response.donation}`, {
          state: {
            donationNumber: response.donationNumber,
            paymentMethod: donationSetup?.paymentMethod,
            frequency: donationSetup?.frequency,
            amount: donationSetup?.amount,
            name: personalDetails?.name,
            date: response.donationDate
          }
        });
      }
      reset();
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  });
};
