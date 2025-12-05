import React from 'react';
import { Box } from '@mui/material';
import type {
  PaymentMethods
} from '@/interface/donation.interface';
import BankTransferInstruction from './payment/BankTransferInstruction';
import ChequeInstruction from './payment/ChequeInstruction';
import PayNowInstruction from './payment/PayNowInstruction';

interface PaymentInstructionProps {
  paymentMethod: PaymentMethods;
  listBank: IListBank[];
  errors?: {
    bankName?: string;
    chequeNo?: string;
    ReferenceNo?: string;
  };
  amount?: number;
  donationId?: string;
  onSelectBank: (_value: string) => void;
}

export interface IListBank {
  label: string;
  value: string;
}

const PaymentInstruction: React.FC<PaymentInstructionProps> = ({
  amount,
  donationId,
  errors,
  listBank,
  onSelectBank,
  paymentMethod
}) => {

  return (
    <Box marginBottom='30px'>
      {paymentMethod === 'PayNow' && (
        <PayNowInstruction donationId={donationId || ''} />
      )}

      {paymentMethod === 'Bank Transfer' && (
        <BankTransferInstruction
          onSelectBank={onSelectBank}
          amount={amount}
          errors={errors}
        />
      )}

      {paymentMethod === 'Cheque' && (
        <ChequeInstruction listBank={listBank} errors={errors} />
      )}
    </Box>
  );
};

export default PaymentInstruction;
