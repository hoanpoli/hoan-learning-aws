import React from 'react';
import type { ButtonProps } from '@mui/material';
import { ButtonBase, Typography } from '@mui/material';
import { neutral } from '@/theme/colors';

interface ButtonCustomProps extends ButtonProps {
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: number;
  width?: string;
}

const ButtonOutlinedBorder: React.FC<ButtonCustomProps> = ({
  children,
  fontSize = '16px',
  fontWeight = 600,
  width = 'auto',
  ...props
}) => {
  return (
    <ButtonBase
      {...props}
      sx={{
        'borderRadius': '12px',
        'boxShadow': 'none',
        'color': neutral[700],
        'backgroundColor': '#fff',
        'width': width,
        'padding': '8px 14px',
        'border': `1px solid ${neutral[300]}`,
        '&:hover': {
          boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.06)'
        },
        'zIndex': 50
      }}
    >
      <Typography
        fontSize={fontSize}
        fontWeight={fontWeight}
        lineHeight='20px'
      >
        {children}
      </Typography>
    </ButtonBase>
  );
};

export default ButtonOutlinedBorder;
