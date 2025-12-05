export type FrequencyType = 'One-Time' | 'Recurring';

export type DonationCategoriesType =
  | 'Individual'
  | 'Organisation'
  | 'Anonymous';

export type PaymentMethods =
  | 'PayNow'
  | 'Bank Transfer'
  | 'Cheque'
  | 'Credit Card';

export interface DonationSetup {
  frequency?: FrequencyType;
  amount?: number;
  otherAmount?: number;
  oldAmount?: number;
  paymentMethod?: PaymentMethods;
  isTaxDeduct?: boolean;
  isTaxDifferent?: boolean;
}

export interface PersonalDetails {
  donorType: DonationCategoriesType;
  email?: string;
  salutation?: string;
  name?: string;
  taxRecipientName?: string;
  taxRecipientId?: string;
  postalCode?: string;
  unitNumber?: string;
  address?: string;
  howYouKnow?: string;
  remarks?: string;
  isAgree?: boolean;
  updateNewsletter?: boolean;
  orgName?: string;
  // uenNumber?: string;
  contactPerson?: string;
  isSingpass?: boolean;
}

export interface donationApiData {
  frequency: FrequencyType;
  amount: number;
  paymentMethod: PaymentMethods;

  //personal details
  donorType: DonationCategoriesType;
  salutation?: string;
  email: string;
  name: string;
  isTaxDeduct?: boolean;
  isTaxDifferent?: boolean;
  taxRecipientId?: string;
  taxRecipientName?: string;
  postalCode?: string;
  unitNumber?: string;
  address?: string;
  howYouKnow: string;
  remarks?: string;
  isAgree: boolean;
  updateNewsletter: boolean;
  orgName?: string;
  uenNumber?: string;
  contactPerson?: string;
  programmeId?: string;
  advertisement?: string;
  isDoubleImpact?: boolean;
}

type DonationAttributes = {
  type: string;
  url: string;
};

export interface DonationResult {
  donation?: {
    attributes?: DonationAttributes;
    Id?: string;
    Name?: string;
    Amount_Entered__c?: number;
    Donation_Date__c?: string;
    Donation_Status__c?: string;
    Frequency_Type_Entered__c?: string;
    Payment_Method_Entered__c?: string;
    Donor_Type_Entered__c?: string;
    Email_Entered__c?: string;
    Salutation_Entered__c?: string;
    Full_Name_Entered__c?: string;
    Tax_Recipient_ID_No_Entered__c?: string | null;
    Tax_Recipient_Full_Name_Entered__c?: string | null;
    Address_Postal_Code_Entered__c?: string | null;
    Address_Unit_Number_Entered__c?: string | null;
    Address_Entered__c?: string | null;
    How_do_you_know_about_us_Entered__c?: string;
    Remarks_Entered__c?: string | null;
    Organisation_Name_Entered__c?: string;
  };
}

export interface DonationResponse {
  donation?: string;
  donationNumber?: string;
  message?: string;
  session?: string;
  donationDate?: string;
}

export interface CustomError extends Error {
  response: {
    status?: number;
    data?: {
      message?: string;
      success?: boolean;
      error_code?: number;
    };
  };
}

export interface listBanks {
  banks: string[]
}
export interface listSalutations {
  salutations: string[]
}