import React from 'react';
import { Typography } from '@mui/material';
import { useCountdown } from '@/hooks/useCountdown';
import { primary } from '@/theme/colors';

interface CountdownViewProps {
  targetDate: string;
}

const CountdownView: React.FC<CountdownViewProps> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <Typography
      fontSize='30px'
      lineHeight='38px'
      color={primary[600]}
      fontWeight='700'
      zIndex='50'
    >
      {days === 0 ? '' : `${days}d:`}
      {hours}:{minutes}:{seconds}
    </Typography>
  );
};

export default CountdownView;
