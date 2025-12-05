import type { SingpassAuthDataResponse, SingpassPersonBodyData, SingpassPersonResponse } from '@/interface/singpass.interface';
import APISingpass from './singpass.base';

export const singpassAuthData = async(): Promise<SingpassAuthDataResponse> => {
  const {data} = await APISingpass().request<SingpassAuthDataResponse>({
    url: '/authData',
    method: 'GET'
  })

  return data;
}

export const singpassPersonData = async(params?: SingpassPersonBodyData): Promise<SingpassPersonResponse> => {
  const {data} = await APISingpass().request<SingpassPersonResponse>({
    url: '/person',
    method: 'GET',
    params: params
  });

  return data;
}