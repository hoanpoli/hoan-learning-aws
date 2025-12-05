import { useQuery } from 'react-query';
import { singpassAuthData, singpassPersonData } from '@/api/singpass';
import type { SingpassPersonBodyData } from '@/interface/singpass.interface';

const useSingPass = () => {
  const getAuth = (props: { enable: boolean }) => {
    const queryFn = async() => {
      const response = await singpassAuthData();

      return response;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const query = useQuery({
      queryKey: ['singpass', 'auth'],
      queryFn: queryFn,
      enabled: props.enable
    });

    return query;
  };

  const getPerson = (data: SingpassPersonBodyData) => {

    const queryFn = async() => {
      const response = await singpassPersonData(data);
      return response;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const query = useQuery({
      queryKey: ['singpass', 'person', data],
      queryFn: queryFn,
      enabled: !!data.code_verifier && !!data.nonce && !!data.paramCode && !!data.paramState && !!data.state,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity
    });

    return query;
  };

  return { getAuth, getPerson };
};

export default useSingPass;
