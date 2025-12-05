import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { CheckCircle, X } from '@phosphor-icons/react';
import type { PaymentMethods } from '@/interface/donation.interface';
import ButtonCustom from '../Button/ButtonCustom';
import ButtonOutlinedBorder from '../Button/ButtonOutlinedBorder';

interface ModalConfirmationProps {
  open: boolean;
  onClose: () => void;
  paymentMethod: PaymentMethods;
  name?: string;
  onSubmit: () => void;
  bankName?: string;
  chequeNo?: string;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  bankName,
  chequeNo,
  name,
  onClose,
  onSubmit,
  open,
  paymentMethod
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ width: '400px', margin: '0 auto' }}
    >
      <Box padding='24px' borderRadius='12px' bgcolor='#FFF'>
        <Box display='flex' justifyContent='space-between'>
          <CheckCircle size='24px' color='#87A438' />
          <X
            size='24px'
            color='#6C737F'
            style={{ cursor: 'pointer' }}
            onClick={onClose}
          />
        </Box>
        <Box mt='16px'>
          <Typography
            color='#111927'
            fontSize='18px'
            fontWeight='600'
            lineHeight='28px'
          >
            Confirm the donation
          </Typography>
          <Typography mt={4} color='#4D5761' lineHeight='20px'>
            Please read the instructions and proceed with the transaction. Once
            you are done, ensure the information down below is correct and
            select confirm.
          </Typography>
        </Box>

        {paymentMethod !== 'PayNow' && (
          <Box mt='16px' padding='16px' borderRadius='12px' bgcolor='#F3F4F6'>
            <Box>
              <Typography
                color='#4D5761'
                lineHeight='20px'
                fontFamily='Montserrat'
              >
                Bank
              </Typography>
              <Typography
                fontFamily='Montserrat'
                color='#111927'
                fontWeight='500'
                lineHeight='20px'
              >
                {bankName}
              </Typography>
            </Box>
            <Box mt='12px'>
              {paymentMethod === 'Bank Transfer' ? (
                <>
                  <Typography
                    color='#4D5761'
                    lineHeight='20px'
                    fontFamily='Montserrat'
                  >
                    Bank Account Holder
                  </Typography>
                  <Typography
                    fontFamily='Montserrat'
                    color='#111927'
                    fontWeight='500'
                    lineHeight='20px'
                  >
                    {name || 'Anonymous'}
                  </Typography>
                </>
              ) : (
                paymentMethod === 'Cheque' && (
                  <>
                    <Typography
                      color='#4D5761'
                      lineHeight='20px'
                      fontFamily='Montserrat'
                    >
                      Cheque No.
                    </Typography>
                    <Typography
                      color='#111927'
                      fontWeight='500'
                      lineHeight='20px'
                      fontFamily='Montserrat'
                    >
                      {chequeNo}
                    </Typography>
                  </>
                )
              )}
            </Box>
          </Box>
        )}

        <Box
          mt='32px'
          gap={3}
          display='flex'
          justifyContent='center'
          width='100%'
        >
          <ButtonOutlinedBorder width='100%' onClick={onClose}>
            Cancel
          </ButtonOutlinedBorder>
          <ButtonCustom onClick={onSubmit} width='100%'>
            Confirm
          </ButtonCustom>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalConfirmation;
