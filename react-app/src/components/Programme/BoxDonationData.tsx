import {
  Box,
  LinearProgress,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import dayjs from 'dayjs';
import { info, neutral } from '@/theme/colors';

interface BoxDonationDataProps {
  currentDonation?: number;
  goalDonation?: number;
  startDate?: string;
  endDate?: string;
  percentage?: number;
  liveDonation?: boolean;
}

const BoxDonationData: React.FC<BoxDonationDataProps> = ({
  currentDonation,
  endDate,
  goalDonation,
  liveDonation,
  percentage,
  startDate
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const formateDate = (date?: string) => {
    if (date) {
      return dayjs(date).format('DD/MM/YYYY');
    }
    return '-';
  };

  const progress = percentage || 0;

  return (
    <Stack
      mt='16px'
      direction={isMobile ? 'column' : 'row'}
      justifyContent={liveDonation ? 'space-between' : 'flex-start'}
      padding='20px'
      border='1px solid #E5E7EB'
      borderRadius='16px'
    >
      {liveDonation && (
        <Box
          minWidth={isMobile ? 'auto' : '180px'}
          display='flex'
          flexDirection='column'
        >
          <Stack direction='row' gap='7px' alignItems='center'>
            <Typography
              sx={{
                color: info[700],
                fontSize: '16px',
                fontWeight: '600 !important',
                lineHeight: '24px'
              }}
            >
              S${currentDonation || 0}
            </Typography>
            <Box display='flex' gap='4px'>
              <Typography
                color={neutral[500]}
                fontSize='12px'
                fontWeight='400'
                lineHeight='18px'
              >
                of
              </Typography>
              <Typography
                fontSize='12px'
                fontWeight='600'
                lineHeight='18px'
                color={neutral[900]}
              >
                S${goalDonation || 0}
              </Typography>
              <Typography
                color={neutral[500]}
                fontSize='12px'
                fontWeight='400'
                lineHeight='18px'
              >
                raised
              </Typography>
            </Box>
          </Stack>
          <LinearProgress
            variant='determinate'
            value={progress > 100 ? 100 : progress}
            sx={{
              height: '8px',
              marginTop: '5px',
              borderRadius: '999px',
              backgroundColor: neutral[100],
              '& .MuiLinearProgress-bar': {
                backgroundColor: info[500]
              }
            }}
          />{' '}
        </Box>
      )}
      <Stack
        mt={isMobile ? 3 : 0}
        direction='row'
        justifyContent={isMobile ? 'flex-start' : 'space-between'}
        spacing='24px'
      >
        <Box>
          <Typography
            lineHeight='20px'
            textAlign={liveDonation ? 'end' : 'start'}
            color={neutral[500]}
            fontSize='14px'
          >
            Start Date
          </Typography>
          <Typography
            fontWeight='500'
            lineHeight='20px'
            fontSize='14px'
            color={neutral[900]}
          >
            {formateDate(startDate)}{' '}
          </Typography>
        </Box>
        <Box>
          <Typography
            lineHeight='20px'
            textAlign={liveDonation ? 'end' : 'start'}
            color={neutral[500]}
            fontSize='14px'
          >
            End Date
          </Typography>
          <Typography
            fontWeight='500'
            lineHeight='20px'
            fontSize='14px'
            color={neutral[900]}
          >
            {formateDate(endDate)}{' '}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default BoxDonationData;
