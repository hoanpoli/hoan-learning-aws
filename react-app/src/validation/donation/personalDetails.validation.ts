import type { PersonalDetails } from '@/interface/donation.interface';
import yup from '../yup.validation';

export const personalDetailValidation = yup.object<PersonalDetails>().shape({
  donorType: yup
    .string()
    .oneOf(['Individual', 'Organisation', 'Anonymous'], 'Invalid donor type')
    .required('Donor type is required'),
  email: yup.string().when('donorType', {
    is: (donorType: string) => donorType !== 'Anonymous',
    then: () =>
      yup
        .string()
        .required('Email is required')
        .trim()
        .lowercase()
        .email('Invalid email format!'),
    otherwise: () => yup.string().trim().lowercase().email()
  }),
  salutation: yup.string().when('donorType', {
    is: (donorType: string) => donorType === 'Individual',
    then: () => yup.string().required('Salutation is required').trim(),
    otherwise: () => yup.string().trim()
  }),
  name: yup.string().when('donorType', {
    is: (donorType: string) => donorType === 'Individual',
    then: () =>
      yup.string().required('Fullname is required!').trim(),
    otherwise: () => yup.string().trim()
  }),
  isTaxDeduct: yup.boolean(),
  isDifferentTaxRecipient: yup.boolean(),
  taxRecipientId: yup
    .string()
    .trim()
    .when('isTaxDeduct', {
      is: true,
      then: () =>
        yup
          .string()
          .trim()
          .when('donorType', {
            is: 'Individual',
            then: () =>
              yup
                .string()
                .trim()
                .required('Tax Recipient ID is required for an individual')
                .nric('Invalid NRIC/FIN number!'),
            otherwise: () =>
              yup.string().when('donorType', {
                is: 'Organisation',
                then: () =>
                  yup
                    .string()
                    .required(
                      'Tax Recipient ID is required for an organisation'
                    )
                    .organisationIDNumber('Invalid UEN number!')
              })
          }),
      otherwise: () => yup.string().trim()
    }),
  taxRecipientName: yup
    .string()
    .trim()
    .when('isDifferentTaxRecipient', {
      is: (isDifferentTaxRecipient: boolean) => isDifferentTaxRecipient,
      then: () =>
        yup
          .string()
          .required('Tax Recipient Name is required')
          .notOneOf(
            [yup.ref('name')],
            'Tax Recipient Name cannot be same as Name'
          ),
      otherwise: () => yup.string().trim()
    }),
  postalCode: yup
    .string()
    .trim()
    .matches(
      /^(\d{6}|)$/,
      'Invalid postal code. The postal code must be 6 digits number!'
    ),
  unitNumber: yup.string().trim(),
  address: yup.string().trim().max(100),
  howYouKnow: yup.string().trim().required('This field is required'),
  remarks: yup.string().trim().max(200),
  isAgree: yup.boolean().required('You must agree to the privacy statement'),
  isUpdateNewsletter: yup.boolean(),
  orgName: yup.string().when('donorType', {
    is: (val: string) => val === 'Organisation',
    then: () => yup.string().trim().required('Organisation name is required')
  }),

  contactPerson: yup.string().when('donorType', {
    is: (val: string) => val === 'Organisation',
    then: () => yup.string().trim().required('Contact person is required'),
    otherwise: () => yup.string().trim()
  }),
  isSingpass: yup.boolean()
});
