import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getDetailProgramme } from '@/api/programme';

const useGetProgrammeDetail = (
  programmeId: string
) => {
  const queryFn = async () => {
    const response = await getDetailProgramme(programmeId);
    return response.data;
  };

  const query = useQuery(['programme-details', programmeId], queryFn, {
    enabled: !!programmeId,
    refetchOnReconnect: false,
    refetchOnWindowFocus: true,
    retry: false,
    refetchOnMount: true
  });

  useEffect(() => {
    const handlePopState = () => {
      query.refetch();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [query]);

  return query;
};

export default useGetProgrammeDetail;
