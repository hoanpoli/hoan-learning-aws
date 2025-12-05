import { useQuery } from 'react-query';
import { getDetailProgramme, getProgrammeByAdCode } from '@/api/programme';

const useGetProgrammeByAdCode = (programmeId: string, adCode: string) => {
  const queryFn = async () => {
    if (programmeId) {
      const response = await getDetailProgramme(programmeId);
      return response.data;
    } else if (adCode) {
      const response = await getProgrammeByAdCode(adCode);
      return response.data;
    }
  };

  return useQuery(['programme-donation', programmeId, adCode], queryFn, {
    enabled: Boolean(programmeId || adCode),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: true
  });
};

export default useGetProgrammeByAdCode;
