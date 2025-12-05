import React from 'react';
import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import { primary, secondary } from '@/theme/colors';

interface ButtonCustomProps extends ButtonProps {
  children: React.ReactNode;
  width?: string;
}

const ButtonPrimaryLight: React.FC<ButtonCustomProps> = ({
  children,
  width = 'auto',
  ...props
}) => {
  return (
    <Button
      {...props}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: secondary[800],
        backgroundColor: primary[100],
        width: width,
        padding: '8px 14px',
        zIndex: 1,
        transition: 'background-color 0.4s ease-in-out, color 0.4s ease-in-out',
        '&:hover': {
          backgroundColor: primary[400],
          color: 'white'
        }
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimaryLight;
