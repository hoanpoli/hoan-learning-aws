import type { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { finalizeDonation } from '@/api/donation';
import type { FinalizeApiData } from '@/interface/finalize.interface';

export const useMutationFinalize = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const mutationFn = async (params: [string, FinalizeApiData]) => {
    const [donationId, data] = params;
    return finalizeDonation(donationId, data);
  };

  return useMutation<
    AxiosResponse<FinalizeApiData>,
    AxiosError,
    [string, FinalizeApiData]
  >('create-finalize', mutationFn, {
  	onSuccess: () => {
  		navigate(`/donate-result/${state.donationNumber}`);
  	},
  	onError: (err) => {
  		// eslint-disable-next-line no-console
  		console.log(err);
  	}
  });
};
