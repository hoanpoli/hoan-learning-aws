import React from 'react';
import type { ButtonProps } from '@mui/material';
import { ButtonBase } from '@mui/material';
import { primary } from '@/theme/colors';

interface ButtonCustomProps extends ButtonProps {
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: number;
  variant?: 'contained' | 'outlined' | 'text';
  width?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  children,
  fontSize = '16px',
  fontWeight = 600,
  size = 'md',
  variant = 'contained',
  width = 'auto',
  ...props
}) => {
  const styles = {
    backgroundColor:
      variant === 'contained'
        ? primary[500]
        : variant === 'outlined'
          ? primary[50]
          : '#fff',
    color: variant === 'contained' ? '#fff' : primary[700],
    bgColorHover:
      variant === 'contained'
        ? primary[600]
        : variant === 'outlined'
          ? primary[100]
          : primary[50],
    padding:
      size === 'sm'
        ? '6px 10px'
        : size === 'md'
          ? '8px 14px'
          : size === 'lg'
            ? '10px 18px'
            : size === 'xl'
              ? '12px 20px'
              : '14px 22px'
  };

  return (
    <ButtonBase
      {...props}
      sx={{
        'borderRadius': '12px',
        'boxShadow': 'none',
        'color': styles.color,
        'backgroundColor': styles.backgroundColor,
        'width': width,
        'padding': styles.padding,
        'display': 'flex',
        'alignItems': 'center',
        'zIndex': 50,
        'fontSize': fontSize,
        'lineHeight': '20px',
        'fontWeight': fontWeight,
        '&:hover': {
          backgroundColor: styles.bgColorHover,
          boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.06)'
        }
      }}
    >
      {children}
    </ButtonBase>
  );
};

export default ButtonCustom;
