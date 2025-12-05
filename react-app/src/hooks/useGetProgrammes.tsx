import { useQuery } from 'react-query';
import { getAllProgrammes } from '@/api/programme';
import type { CustomError } from '@/interface/donation.interface';
import type { ProgrammesAPIData } from '@/interface/programme.interface';

interface ProgrammeParams {
    page: number;
    limit: number;
    search?: string;
    featured: boolean
}

const useGetProgrammes = (params: ProgrammeParams) => {

  const queryFn = async () => {
    const responseData = await getAllProgrammes(params.page, params?.search, params.limit, params.featured);
    return responseData.data;
  }

  const { data, error, isError, isLoading } = useQuery(
    ['programme-lists', params.page, params?.search, params.limit, params.featured], queryFn, 
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false
    }
  );

  const programmesData = data as ProgrammesAPIData | undefined;
  const errors = error as CustomError;

  const errorData = errors?.response?.data;

  return { data: programmesData, isError, isLoading, error: errorData };;
}

export default useGetProgrammes;