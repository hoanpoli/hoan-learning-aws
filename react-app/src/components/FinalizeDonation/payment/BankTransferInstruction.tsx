import { Box, Grid, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import InputFloating from '@/components/InputFloating';
import { neutral } from '@/theme/colors';
interface BankTransferInstructionProps {
  onSelectBank: (_value: string) => void;
  amount?: number;
  errors?: {
    bankName?: string;
    referenceNo?: string;
  };
}

const BankTransferInstruction: React.FC<BankTransferInstructionProps> = ({
  amount,
  errors
}) => {
  const methods = useFormContext();

  return (
    <Grid container>
      <Grid item xs={12} mt={3}>
        <Box
          bgcolor={neutral[50]}
          border={`1px solid ${neutral[200]}`}
          borderRadius='12px'
          padding='20px'
        >
          <Typography
            fontWeight={600}
            fontFamily='Montserrat'
            lineHeight='24px'
          >
            Instruction
          </Typography>
          <Typography
            fontSize='14px'
            fontFamily='Montserrat'
            lineHeight='20px'
            fontWeight={400}
          >
            Please transfer the donation amount of
            <span style={{ fontWeight: 600 }}> S${amount} </span>
            to the bank details down below.
          </Typography>
          <Grid container>
            <Grid item xs={7}>
              <TextInstruction
                label='Account Name'
                value='Breast Cancer Foundation'
              />
            </Grid>
            <Grid item xs={5}>
              <TextInstruction
                label='Branch Name'
                value='Marina Bay Financial Centre'
              />
            </Grid>
            <Grid item xs={7}>
              <TextInstruction label='Account No' value='072-039862-9' />
            </Grid>
            <Grid item xs={5}>
              <TextInstruction label='Bank Swift Code' value='DBSSSGSG' />
            </Grid>
            <Grid item xs={7}>
              <TextInstruction
                label='Bank Name'
                value='DBS Bank Limited'
              />
            </Grid>
            <Grid item xs={5}>
              <TextInstruction label='Bank Code' value='7171' />
            </Grid>
            <Grid item xs={7}>
              <TextInstruction
                label='Bank Address'
                value='12 Marina Boulevard Tower 3, 3 Level Marina Bay Financial Centre, Singapore 01898'
              />
            </Grid>
            <Grid item xs={5}>
              <TextInstruction label='Branch Code' value='72' />
            </Grid>
          </Grid>
        </Box>
        <Typography
          mt='32px'
          sx={{
            fontFamily: 'Montserrat',
            color: '#4D5761',
            fontSize: '14px',
            lineHeight: '20px',
            textAlign: 'center'
          }}
        >
          Please fill in the bank reference number:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <InputFloating
          label='Reference Number'
          {...methods.register('referenceNo')}
          value={methods.watch('referenceNo')}
          defaultValue={methods.watch('referenceNo')}
          error={!!errors?.referenceNo}
          helperText={errors?.referenceNo || ''}
        />
      </Grid>
    </Grid>
  );
};

interface TextInstructionProps {
  label: string;
  value: string;
}

const TextInstruction: React.FC<TextInstructionProps> = ({ label, value }) => {
  return (
    <Typography
      fontWeight={600}
      color={neutral[700]}
      fontSize='14px'
      fontFamily='Montserrat'
      lineHeight='20px'
    >
      {label}:
      <span
        style={{
          marginLeft: '5px',
          maxWidth: '450px',
          color: neutral[700],
          fontWeight: 400,
          fontSize: '14px',
          fontFamily: 'Montserrat',
          lineHeight: '20px'
        }}
      >
        {value}
      </span>
    </Typography>
  );
};

export default BankTransferInstruction;
