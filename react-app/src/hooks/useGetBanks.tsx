import { useQuery } from 'react-query';
import { listOfBanks } from '@/api/donation';
import type { CustomError, listBanks } from '@/interface/donation.interface';

type OnSuccessCallback = (_data: listBanks) => void;
type OnErrorCallback = (_error: CustomError) => void;

const useGetBanks = (onSuccess: OnSuccessCallback, onError: OnErrorCallback) => {
  const queryFn = async() => {
    const response = await listOfBanks();
    return response.data;
  };

  return useQuery(
    ['list-of-bank'],
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

export default useGetBanks;