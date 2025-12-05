import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type {
  DonationCategoriesType,
  DonationSetup,
  PersonalDetails
} from '@/interface/donation.interface';

interface DonationProfile {
  salutation?: string;
  name?: string;
  orgName?: string;
  donorType?: DonationCategoriesType;
}

interface DonationState {
  donationStep: number;
  donationSetup?: DonationSetup;
  personalDetails?: PersonalDetails;
  isDoubleAmount?: boolean;
  amount: number;
  donationProfile?: DonationProfile;
  setDonationSetup: (_donationSetup: DonationSetup) => void;
  setPersonalDetails: (_personalDetails: PersonalDetails) => void;
  nextStep: () => void;
  previousStep: () => void;
  doubleDonation: () => void;
  setAmount: (_amount: number) => void;
  setDonationProfile: (_donationProfile: DonationProfile) => void;
  reset: () => void;
}

export const useDonation = create<DonationState>()(
  persist(
    (set) => ({
      donationStep: 0,
      donationSetup: undefined,
      personalDetails: undefined,
      isDoubleAmount: false,
      amount: 0,
      setAmount: (amount) => set({ amount: amount, isDoubleAmount: false }),
      setDonationSetup: (donationSetup) => set({ donationSetup: donationSetup }),
      setPersonalDetails: (personalDetails) =>
        set({ personalDetails: personalDetails }),
      nextStep: () =>
        set((state) => ({
          donationStep:
            state.donationStep < 2 ? state.donationStep + 1 : state.donationStep
        })),
      previousStep: () =>
        set((state) => ({
          donationStep:
            state.donationStep > 0 ? state.donationStep - 1 : state.donationStep
        })),
      doubleDonation: () =>
        set((state) => ({
          donationSetup: { ...state.donationSetup, amount: state.amount * 2 },
          isDoubleAmount: true,
          amount: state.amount * 2
        })),
      setDonationProfile: (donationProfile) =>
        set({ donationProfile: donationProfile }),
      reset: () =>
        set(() => ({
          donationSetup: undefined,
          donationProfile: undefined,
          personalDetails: undefined,
          donationStep: 0,
          amount: 0
        }))
    }),
    {
      name: 'donation-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)