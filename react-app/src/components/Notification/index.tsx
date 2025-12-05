import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { WarningCircle } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { neutral, primary, warning } from '@/theme/colors';

interface NotificationProps {
  title: string;
  message: string;
  href?: string;
  buttonLabel?: string | null;
}

const Notification: React.FC<NotificationProps> = ({
  buttonLabel = null,
  href = '',
  message,
  title
}) => {
  const navigate = useNavigate();
  return (
    <Box
      border={`1px solid ${warning[500]}`}
      bgcolor={warning[50]}
      padding='16px 24px'
      borderRadius='16px'
    >
      <Stack
        direction='row'
        gap={2}
        justifyContent='space-between'
        alignItems='center'
      >
        <Stack direction='row' gap='20px' alignItems='center'>
          <Box
            width='32px'
            borderRadius='100%'
            height='32px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            bgcolor={primary[100]}
          >
            <WarningCircle color={primary[600]} size='20px' />
          </Box>
          <Box maxWidth='800px' display='flex' flexDirection='column' gap='5px'>
            <Typography
              fontWeight='600'
              lineHeight='24px'
              color={neutral[900]}
            >
              {title}
            </Typography>
            <Typography
              lineHeight='24px'
              color={neutral[600]}
            >
              {message}
            </Typography>
          </Box>
        </Stack>
        {buttonLabel && (
          <Button
            size='md'
            onClick={() => navigate(href)}
            style={{
              backgroundColor: '#FF54AA'
            }}
          >
            {buttonLabel}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default Notification;
