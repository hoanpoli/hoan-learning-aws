import type { InputHTMLAttributes, ReactNode } from 'react';
import React, { useId } from 'react';
import { Box, FormHelperText } from '@mui/material';

import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import { combineClasses } from '@/helpers/style';
import Render from '../Render/Render';
import classes from './InputFloating.module.scss';

export interface InputLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  helperText?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
}

const InputFloating: React.FC<InputLabelProps> = React.forwardRef<
  HTMLInputElement,
  InputLabelProps
>((props, ref) => {
  const id = useId();
  const {
    endIcon,
    error,
    helperText,
    label,
    required,
    startIcon,
    ...inputProps
  } = props;

  return (
    <div data-testid='input-label'>
      <Box id={id} className={classes.FormGroup}>
        {startIcon && (
          <Box className={classes.StartIcon}>{startIcon || ''}</Box>
        )}
        <Box
				  className={[
				    classes.Container,
				    error && classes.Error,
				    props.disabled && classes.Disabled,
				    props.startIcon && classes.Input_startIcon
				  ].join(' ')}
        >
          <Box className={classes.InputLabel}>
            <input
						  className={classes.Input}
						  placeholder=' '
						  {...inputProps}
						  ref={ref}
            />
            <label className={classes.Label}>
              {label}
              <Render in={!!required}>
                <span className={classes.Asteric}>*</span>
              </Render>
            </label>
          </Box>
        </Box>
        {endIcon && <Box className={classes.EndIcon}>{endIcon || ''}</Box>}
      </Box>
      <FormHelperText
			  className={combineClasses([classes.HelperText, error && classes.Error])}
			  sx={{ position: helperText ? 'static' : 'absolute' }}
      >
        {helperText as string}
      </FormHelperText>
    </div>
  );
});

InputFloating.displayName = 'InputFloating';
export default InputFloating;
