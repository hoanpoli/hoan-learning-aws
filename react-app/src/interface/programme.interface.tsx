export type ProgrammeStatus =
  | 'Started'
  | 'Planned'
  | 'Ended'
  | 'Completed'
  | 'Rejected'
  | 'Cancelled'
  | 'Expired';

export interface ProgrammesData {
  Id: string;
  Name: string;
  Start_Date_Time__c: string;
  End_Date_Time__c: string;
  Programme_Event_Banner_Image__c?: string;
  Programme_Event_Banner__c?: string;
  Programme_Description__c: string;
  Fundraising_Target__c: number;
  Avg_Donation_Amt__c: number;
  Achievement__c: number;
  Cost_Per_Donation__c: number;
  Actual_Donation_Amt__c: number;
  Programme_Stage__c: string;
  Programme_Stage_Formula__c: string;
  Venue__c?: string;
  Overview__c?: string;
  Why_it_Matters__c?: string;
  Your_Impact__c?: string;
  Live_Donation_Detail__c?: boolean;
}

export interface advertisementData {
  Id: string;
  Name: string;
  Programme_Event__c: string;
  Ad_Code__c: string;
}

export interface Pagination {
  totalData: number;
  totalPage: number;
  page: number;
}

export interface ProgrammesAPIData {
  programmes: ProgrammesData[];
  metadata: Pagination;
}

export interface ProgrammesInterface {
  id: string;
  programmeName: string;
  desc: string;
  date: string;
  currentDonate: number;
  goalOfDonate: number;
  valueDonate: number;
  image?: React.ReactNode;
}

export interface ResponseProgrammeByAdCode {
  advertisement: advertisementData;
  programme: ProgrammesData;
}

export interface ProgrammeDetailResponse {
  programme: ProgrammesData
}