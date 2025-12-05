import { Box, Typography, useMediaQuery } from '@mui/material';
import { primary } from '@/theme/colors';

interface HowMuchDonateProps {
  show: boolean;
}

const HowMuchDonate: React.FC<HowMuchDonateProps> = ({ show }) => {
  const isMobile = useMediaQuery('(max-width:800px)');
  return (
    <Box
      display={show ? 'block' : 'none'}
      marginTop={isMobile ? '16px' : '0'}
      marginX={isMobile ? 0 : '20px'}
      padding='20px'
      marginBottom='50px'
      borderRadius='24px'
      width={isMobile ? 'auto' : '100%'}
      sx={{
        backgroundColor: isMobile ? primary[100] : 'rgba(0, 0, 0, 0.30)',
        backdropFilter: 'blur(20px)'
      }}
    >
      <Typography
        fontSize={isMobile ? '14px' : '20px'}
        fontWeight='700'
        lineHeight={isMobile ? '20px' : '30px'}
        color={isMobile ? primary[900] : '#FFF'}
      >
        How much should I donate?
      </Typography>

      <Typography
        color={isMobile ? primary[900] : '#FFF'}
        fontSize={isMobile ? '12px' : '14px'}
        lineHeight={isMobile ? '18px' : '20px'}
        fontWeight='400'
      >
        Every bit makes a difference.
      </Typography>
    </Box>
  );
};

export default HowMuchDonate;
