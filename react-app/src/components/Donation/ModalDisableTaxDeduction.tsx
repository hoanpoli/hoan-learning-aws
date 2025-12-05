import React from 'react';
import { Box, Modal, Stack, Typography } from '@mui/material';
import { Info, X } from '@phosphor-icons/react';
import { neutral } from '@/theme/colors';
import ButtonNeutral from '../Button/ButtonNeutral';
import ButtonPrimaryLight from '../Button/ButtonPrimaryLight';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const style = {
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: '24px'
};

const infoIconStyle = {
  backgroundColor: neutral[100],
  border: `8px solid ${neutral[50]}`,
  borderRadius: '999px',
  display: 'flex',
  height: '38px',
  width: '38px',
  alignItems: 'center',
  justifyContent: 'center',
  color: neutral[600]
};

const ModalDisableTaxDeduction: React.FC<ModalProps> = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{ width: '400px', margin: '0 auto' }}
    >
      <Box sx={style}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
        >
          <Box sx={infoIconStyle}>
            <Info size={24} />
          </Box>
          <Box onClick={props.handleClose} sx={{ cursor: 'pointer' }}>
            <X size={24} color={neutral[500]} />
          </Box>
        </Stack>
        <Typography id='modal-modal-title' variant='subtitle2'>
          Singpass Notice
        </Typography>
        <Typography
          id='modal-modal-description'
          color={neutral[600]}
          sx={{ mt: 2 }}
          fontSize={14}
        >
          For donations under $50, Singpass isn’t available to use. You can either increase your donation amount or continue without Singpass—we’re grateful for your support either way!
        </Typography>
        <Box width='100%' display='flex' gap='12px' mt='32px'>
          <ButtonNeutral width='100%' onClick={props.handleClose}>Cancel</ButtonNeutral>
          <ButtonPrimaryLight width='100%' onClick={props.handleConfirm}>Proceed</ButtonPrimaryLight>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDisableTaxDeduction;
