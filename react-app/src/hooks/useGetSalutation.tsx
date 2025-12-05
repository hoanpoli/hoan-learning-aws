import { useQuery } from 'react-query';
import { listOfSalutation } from '@/api/donation';
import type { CustomError, listSalutations } from '@/interface/donation.interface';

type OnSuccessCallback = (_data: listSalutations) => void;
type OnErrorCallback = (_error: CustomError) => void;

const useGetSalutation = (onSuccess: OnSuccessCallback, onError: OnErrorCallback) => {
  const queryFn = async() => {
    const response = await listOfSalutation();
    return response.data;
  };

  return useQuery(
    ['list-of-salutation'],
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

export default useGetSalutation;