import yup from '../yup.validation';

export const donationSetupValidation = yup.object().shape({
  frequency: yup
    .string()
    .oneOf(['One-Time', 'Recurring'], 'Frequency is required')
    .required('Frequency is required'),
  amount: yup
    .number()
    .min(5, 'Minimum donation is $5')
    .required('Amount is required'),
  paymentMethod: yup
    .string()
    .oneOf(
      ['PayNow', 'Bank Transfer', 'Cheque', 'Credit Card'],
      'Choose a payment method'
    )
    .required('Payment Method is required'),
  isTaxDeduct: yup.boolean(),
  isTaxDifferent: yup.boolean()
});
