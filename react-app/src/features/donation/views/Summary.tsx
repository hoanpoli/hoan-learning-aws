import React from 'react';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

import { useLocation } from 'react-router-dom';
import BoxDonateAmount from '@/components/Donation/BoxDonateAmount';
import BoxDoubleAmount from '@/components/Donation/BoxDoubleAmount';
import ButtonGroupDonation from '@/components/Donation/ButtonGroupDonation';
import BoxSummary from '@/components/Donation/summary-component/BoxSummary';
import ColumnPersonalDetails from '@/components/Donation/summary-component/Column';
import ColumnDonation from '@/components/Donation/summary-component/ColumnDonation';
import { useMutationDonation } from '@/hooks/useMutationDonation';
import type { donationApiData } from '@/interface/donation.interface';
import { useDonation } from '../hooks/DonationHook';
import classes from '../styles/Summary.module.scss';

const Summary: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:800px)');
  const { donationSetup, doubleDonation, isDoubleAmount, personalDetails, previousStep } =
    useDonation();
  const { isLoading, mutate } = useMutationDonation();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const programmeId = searchParams.get('programme') || '';
  const advertisement = searchParams.get('adv') || '';

  const onSubmitForm = () => {
    let donationData = {
      ...donationSetup,
      ...personalDetails,
      isDoubleImpact: isDoubleAmount
    } as donationApiData;

    if (programmeId !== '') {
      donationData = {
        ...donationData,
        programmeId: programmeId
      };
    }

    if (advertisement !== '') {
      donationData = {
        ...donationData,
        advertisement: advertisement
      };
    }

    sessionStorage.clear();
    mutate(donationData);
  };

  return (
    <Box>
      <BoxSummary title='Donation Details'>
        <Stack
          direction='row'
          columnGap={isMobile ? 8 : 2}
          mt={3}
          rowGap={2}
          justifyContent={isMobile ? 'start' : 'none'}
          flexWrap='wrap'
        >
          <ColumnDonation title='Frequency' value={donationSetup?.frequency} />

          <ColumnDonation title='Payment Method' value={donationSetup?.paymentMethod} />

          <ColumnDonation
            title='Amount'
            value={donationSetup?.amount}
            isDoubleAmount={isDoubleAmount}
          />
          {!isDoubleAmount && (
            <Box
              onClick={doubleDonation}
              mt={3}
              className={classes.BoxDoubleFalse}
              width={isMobile ? '100%' : 'auto'}
            >
              <Typography className={classes.TextBoxDouble}>Double my impact!</Typography>
            </Box>
          )}
        </Stack>
      </BoxSummary>

      <BoxSummary title='Personal Details'>
        <Grid container mt='12px' spacing={isMobile ? 0 : 2}>
          <ColumnPersonalDetails title='Entity' value={personalDetails?.donorType} />

          <ColumnPersonalDetails title='Email Address' value={personalDetails?.email || '-'} />

          {personalDetails?.donorType === 'Individual' ? (
            <>
              <ColumnPersonalDetails
                title='Salutation'
                value={personalDetails?.salutation || '-'}
              />

              <ColumnPersonalDetails title='Full Name as in NRIC' value={personalDetails.name} />

              <ColumnPersonalDetails
                title='Tax Recipient ID No. (NRIC/FIN)'
                value={(donationSetup?.isTaxDeduct ? personalDetails.taxRecipientId : '-') || '-'}
              />

              <ColumnPersonalDetails
                title='Tax Recipient Name'
                value={
                  donationSetup?.isTaxDeduct
                    ? donationSetup?.isTaxDifferent
                      ? personalDetails.taxRecipientName
                      : personalDetails.name
                    : '-'
                }
              />
            </>
          ) : (
            personalDetails?.donorType === 'Organisation' && (
              <>
                <ColumnPersonalDetails
                  title='Contact Person'
                  value={personalDetails?.contactPerson || '-'}
                />

                <ColumnPersonalDetails
                  title='Organisation Name'
                  value={personalDetails.orgName || '-'}
                />

                <ColumnPersonalDetails
                  title='UEN No.'
                  value={donationSetup?.isTaxDeduct ? personalDetails.taxRecipientId : '-'}
                />

                <ColumnPersonalDetails
                  title='Tax Recipient Name'
                  value={donationSetup?.isTaxDeduct ? personalDetails.orgName : '-'}
                />
              </>
            )
          )}
          {personalDetails?.donorType !== 'Anonymous' && (
            <>
              <ColumnPersonalDetails
                title='Postal Code'
                value={personalDetails?.postalCode || '-'}
              />

              <ColumnPersonalDetails
                title='Unit Number'
                value={personalDetails?.unitNumber || '-'}
              />

              <ColumnPersonalDetails title='Address' value={personalDetails?.address || '-'} />
            </>
          )}
          <ColumnPersonalDetails
            title='How do you know about us?'
            value={personalDetails?.howYouKnow}
          />

          <ColumnPersonalDetails title='Remarks' value={personalDetails?.remarks || '-'} />
        </Grid>
      </BoxSummary>

      <BoxDoubleAmount
        isDoubleAmount={isDoubleAmount}
        onClickDoubleDonation={doubleDonation}
        show={isMobile}
      />

      <BoxDonateAmount
        amount={donationSetup?.amount || 0}
        donorType={personalDetails?.donorType}
        salutation={personalDetails?.salutation}
        name={personalDetails?.name}
        orgName={personalDetails?.orgName}
        show={isMobile}
      />

      <ButtonGroupDonation
        isLoading={isLoading}
        onClickBack={previousStep}
        onClickContinue={onSubmitForm}
      />
    </Box>
  );
};

export default Summary;
