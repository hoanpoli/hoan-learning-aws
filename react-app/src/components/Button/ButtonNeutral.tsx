import React from 'react';
import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import { neutral } from '@/theme/colors';

interface ButtonCustomProps extends ButtonProps {
  children: React.ReactNode;
  width?: string;
}

const ButtonNeutral: React.FC<ButtonCustomProps> = ({
  children,
  width = 'auto',
  ...props
}) => {
  return (
    <Button
      {...props}
      sx={{
        color: neutral[700],
        backgroundColor: '#fff',
        width: width,
        padding: '8px 14px',
        border: `1px solid ${neutral[300]}`,
        '&:hover': {
          boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.06)',
          backgroundColor: neutral[100]
        },
        zIndex: 50
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonNeutral;
