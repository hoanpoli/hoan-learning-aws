import type { donationApiData } from '@/interface/donation.interface';
import type { FinalizeApiData } from '@/interface/finalize.interface';
import { apiService, methodService } from './apiService';

const URL = {
  DONATION: '/donations'
};

export const sendDonation = (data: donationApiData) => {
  return apiService({
    url: URL.DONATION,
    method: methodService.POST,
    data: data,
    params: null
  });
};

export const getDonation = (donationNumber: string) => {
  return apiService({
    url: URL.DONATION + `/${donationNumber}`,
    method: methodService.GET,
    data: null,
    params: null
  });
};

export const finalizeDonation = (donationId: string, data: FinalizeApiData) => {
  return apiService({
    url: URL.DONATION + `/${donationId}`,
    method: methodService.PATCH,
    data: data,
    params: null
  });
};

export const listOfBanks = () => {
  return apiService({
    url: URL.DONATION + '/banks',
    method: methodService.GET,
    data: null,
    params: null
  });
};

export const listOfSalutation = () => {
  return apiService({
    url: URL.DONATION + '/salutations',
    method: 'GET',
    data: null,
    params: null
  })
}