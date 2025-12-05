import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { HandHeart } from '@phosphor-icons/react';
import type { ProgrammeStatus } from '@/interface/programme.interface';
import { neutral, primary } from '@/theme/colors';
import CountdownView from '../Countdown/CountdownView';

interface SupportProgramSectionProps {
  status: ProgrammeStatus;
  targetDate?: string;
  onClick: () => void;
}

//targetDate use format YYYY-MM-DD
const SupportProgramSection: React.FC<SupportProgramSectionProps> = ({
  onClick,
  status,
  targetDate = ''
}) => {

  return (
    <Box
      bgcolor={primary[50]}
      padding='24px'
      borderRadius='16px'
      position='relative'
    >
      <Box display='flex' flexDirection='column' gap='24px' zIndex='10'>
        {status === 'Started' && (
          <>
            <Typography
              fontWeight='600'
              fontSize='18px'
              color={neutral[900]}
              zIndex='10'
            >
              Let’s support this program!
            </Typography>

            <Button
              onClick={onClick}
              style={{
                backgroundColor: '#FF54AA'
              }}
            >
              Donate Now
              <HandHeart
                height='14.38px'
                width='18.75px'
                color='#fff'
                style={{ marginLeft: '5px' }}
              />
            </Button>
          </>
        )}
        {status === 'Planned' && (
          <>
            <Typography
              fontWeight='600'
              fontSize='18px'
              color={neutral[900]}
              zIndex='10'
            >
              Time remaining until it starts
            </Typography>
            {targetDate !== '' ? (
              <CountdownView targetDate={targetDate} />
            ) : (
              <Typography
                fontSize='30px'
                lineHeight='38px'
                color={primary[600]}
                fontWeight='700'
                zIndex='10'
              >
                0d:00:00:00
              </Typography>
            )}
          </>
        )}
        {status !== 'Started' && status !== 'Planned' && (
          <Typography
            fontWeight='600'
            fontSize='18px'
            color={neutral[900]}
            zIndex='10'
          >
            Thank you for participating in this programme!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SupportProgramSection;
