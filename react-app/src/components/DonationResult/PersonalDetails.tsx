import { Box, Grid, Typography } from '@mui/material';
import type { DonationResult } from '@/interface/donation.interface';
import { neutral } from '@/theme/colors';

const PersonalDetails: React.FC<DonationResult> = ({ donation }) => {
  const getData = (entity: string) => {
    if (entity === 'Individual') {
      const data = [
        { label: 'Entity', value: donation?.Donor_Type_Entered__c },
        { label: 'Email Address', value: donation?.Email_Entered__c },
        { label: 'Salutation', value: donation?.Salutation_Entered__c },
        {
          label: 'Full Name as in NRIC',
          value: donation?.Full_Name_Entered__c
        },
        {
          label: 'Tax Recipient ID No. (NRIC / FIN)',
          value: donation?.Tax_Recipient_ID_No_Entered__c
        },
        {
          label: 'Tax Recipient Name',
          value: donation?.Tax_Recipient_Full_Name_Entered__c
        },
        {
          label: 'Postal Code',
          value: donation?.Address_Postal_Code_Entered__c
        },
        {
          label: 'Unit Number',
          value: donation?.Address_Unit_Number_Entered__c
        },
        { label: 'Address', value: donation?.Address_Entered__c },
        {
          label: 'How do you know about us?',
          value: donation?.How_do_you_know_about_us_Entered__c
        },
        { label: 'Remarks', value: donation?.Remarks_Entered__c }
      ];

      return data;
    } else if (entity === 'Organisation') {
      const data = [
        { label: 'Entity', value: donation?.Donor_Type_Entered__c },
        { label: 'Email Address', value: donation?.Email_Entered__c },
        { label: 'Contact Person', value: donation?.Full_Name_Entered__c },
        {
          label: 'Organisation Name',
          value: donation?.Organisation_Name_Entered__c
        },
        { label: 'UEN No.', value: donation?.Tax_Recipient_ID_No_Entered__c },
        {
          label: 'Tax Recipient Name',
          value: donation?.Organisation_Name_Entered__c
        },
        {
          label: 'Postal Code',
          value: donation?.Address_Postal_Code_Entered__c
        },
        {
          label: 'Unit Number',
          value: donation?.Address_Unit_Number_Entered__c
        },
        { label: 'Address', value: donation?.Address_Entered__c },
        {
          label: 'How do you know about us?',
          value: donation?.How_do_you_know_about_us_Entered__c
        },
        { label: 'Remarks', value: donation?.Remarks_Entered__c }
      ];

      return data;
    } else {
      const data = [
        { label: 'Entity', value: donation?.Donor_Type_Entered__c },
        { label: 'Email Address', value: donation?.Email_Entered__c },
        {
          label: 'How do you know about us?',
          value: donation?.How_do_you_know_about_us_Entered__c
        },
        { label: 'Remarks', value: donation?.Remarks_Entered__c }
      ];

      return data;
    }
  };

  const data = getData(donation?.Donor_Type_Entered__c || '-');

  return (
    <Box
      padding='20px'
      borderRadius='12px'
      border={`1px solid ${neutral[300]}`}
      bgcolor='#FFF'
    >
      <Typography
        fontWeight='600'
        lineHeight='24px'
        fontSize='16px'
        color={neutral[900]}
      >
        Personal Details
      </Typography>
      <Grid container marginTop='10px' rowGap={2} columnGap={4}>
        {data.map((item, index) => (
          <Column key={index} label={item.label} value={item.value || '-'} />
        ))}
      </Grid>
    </Box>
  );
};

interface ColumnProps {
  label: string;
  value?: string;
}

const Column: React.FC<ColumnProps> = ({ label, value }) => {
  return (
    <>
      <Grid item md={3} xs={12}>
        <Typography
          fontWeight='400'
          lineHeight='24px'
          fontSize='16px'
          color={neutral[600]}
        >
          {label}
        </Typography>
      </Grid>
      <Grid item md={8} xs={12}>
        <Typography
          fontWeight='500'
          lineHeight='24px'
          fontSize='16px'
          color={neutral[900]}
        >
          {value}
        </Typography>
      </Grid>
    </>
  );
};

export default PersonalDetails;
