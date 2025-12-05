import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import InputFloating from '@/components/InputFloating';
import Select from '@/components/Select';
import { neutral } from '@/theme/colors';

interface ChequeInstructionProps {
  listBank: {
    label: string;
    value: string;
  }[];
  errors?: {
    bankName?: string;
    chequeNo?: string;
  };
}

const ChequeInstruction: React.FC<ChequeInstructionProps> = ({
  errors,
  listBank
}) => {
  const methods = useFormContext();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          fontWeight='600'
          fontFamily='Montserrat'
          color={neutral[900]}
          lineHeight='24px'
        >
          Instruction
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Column title='Send to:'>
          <Typography fontSize='14px' lineHeight='20px' fontFamily='Montserrat'>
            Fundraising & Partnerships Department
          </Typography>
          <Typography fontSize='14px' lineHeight='20px' fontFamily='Montserrat'>
            Breast Cancer Foundation
          </Typography>
          <Typography fontSize='14px' lineHeight='20px' fontFamily='Montserrat'>
            Blk 441 Sin Ming Avenue #01-417 Singapore 570441
          </Typography>
        </Column>
      </Grid>
      <Grid item md={6}>
        <Column title='On the back of your cheque, please include:'>
          <Typography fontSize='14px' lineHeight='20px' fontFamily='Montserrat'>
            - Full NRIC/FIN or UEN
          </Typography>
          <Typography fontSize='14px' lineHeight='20px' fontFamily='Montserrat'>
            - Full name
          </Typography>
          <Typography fontSize='14px' lineHeight='20px' fontFamily='Montserrat'>
            - Mailing address
          </Typography>
          <Typography fontSize='14px' lineHeight='20px' fontFamily='Montserrat'>
            - Mobile number
          </Typography>
        </Column>
      </Grid>
      <Grid item xs={12}>
        <Typography
          mt='32px'
          mb={1}
          sx={{
            color: '#4D5761',
            fontFamily: 'Montserrat !important',
            fontSize: '14px',
            lineHeight: '20px'
          }}
        >
          Please fill in your bank transfer information:
        </Typography>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Select
              label='Bank'
              options={listBank}
              {...methods.register('bankName')}
              value={methods.watch('bankName')}
              defaultValue={methods.watch('bankName')}
              error={!!errors?.bankName}
              helperText={errors?.bankName}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputFloating
              label='Cheque No.'
              {...methods.register('chequeNo')}
              value={methods.watch('chequeNo')}
              defaultValue={methods.watch('chequeNo')}
              error={!!errors?.chequeNo}
              helperText={errors?.chequeNo}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

interface ColumnProps {
  title: string;
  children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ children, title }) => {
  return (
    <Box>
      <Typography
        fontWeight='600'
        fontSize='14px'
        fontFamily='Montserrat'
        lineHeight='20px'
        marginBottom='5px'
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default ChequeInstruction;
