import yup from '../yup.validation';

export const finalizeValidation = yup.object().shape({
  chequeNo: yup.string().when('paymentMethod', {
    is: (val: string) => val === 'Cheque',
    then: () => yup.string().required('Cheque Number is required')
  }),
  referenceNo: yup.string().when('paymentMethod', {
    is: (val: string) => val === 'Bank Transfer',
    then: () => yup.string().required('Reference Number is required')
  }),
  paymentMethod: yup
    .string()
    .oneOf(
      ['PayNow', 'Bank Transfer', 'Cheque', 'Credit Card'],
      'Choose a payment method'
    )
    .required('Payment Method is required'),
  bankName: yup.string().when('paymentMethod', {
    is: (val: string) => val !== 'PayNow' && val !== 'Bank Transfer',
    then: () => yup.string().required('Bank Name is required')
  })
});
