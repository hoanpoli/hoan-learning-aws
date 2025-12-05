import React from 'react';
import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import { secondary } from '@/theme/colors';

interface ButtonCustomProps extends ButtonProps {
  children: React.ReactNode;
  width?: string;
}

const ButtonSecondaryLight: React.FC<ButtonCustomProps> = ({
  children,
  width = 'auto',
  ...props
}) => {
  return (
    <Button
      {...props}
      sx={{
        color: secondary[700],
        backgroundColor: secondary[100],
        width: width,
        padding: '8px 14px',
        border: `1px solid ${secondary[100]}`,
        '&:hover': {
          boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.06)',
          backgroundColor: secondary[200]
        },
        zIndex: 50
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonSecondaryLight;
