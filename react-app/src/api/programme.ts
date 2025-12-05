import type { AxiosResponse } from 'axios';
import type { ProgrammeDetailResponse, ResponseProgrammeByAdCode } from '@/interface/programme.interface';
import { apiService, methodService } from './apiService';

const URL = {
  PROGRAMMES: '/programmes'
}

export const getAllProgrammes = (page: number = 1, search?: string, limit: number = 6, featured?: boolean) => {
  const keyword = search !== '' ? search : null;
  return apiService({
    url: URL.PROGRAMMES,
    method: methodService.GET,
    data: null,
    params: {page: page, limit: limit, search: keyword, featured: featured}
  })
}

export const getDetailProgramme = (programmeId: string): Promise<AxiosResponse<ProgrammeDetailResponse>> => {
  return apiService<ProgrammeDetailResponse>({
    url: URL.PROGRAMMES + `/${programmeId}`,
    method: methodService.GET,
    params: null
  });
}

export const getProgrammeByAdCode = (adCode: string): Promise<AxiosResponse<ResponseProgrammeByAdCode>> => {
  return apiService<ResponseProgrammeByAdCode>({
    url: `/advertisement/${adCode}/programme`,
    method: methodService.GET,
    data: null,
    params: null
  })
}