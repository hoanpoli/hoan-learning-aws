import React, { useState } from 'react';
import type { SelectChangeEvent, SelectProps } from '@mui/material';
import {
  Box,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select as MuiSelect
} from '@mui/material';
import { CaretDown } from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import Render from '../Render/Render';

import classes from './Select.module.scss';

export interface ISelectProps extends SelectProps {
  options: { label: string; value: string | number }[];
  label: string;
  error?: boolean;
  helperText?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
  value?: string;
}

const selectIcon = (props: IconProps) => {
  return (
    <Box className={classes.Icon}>
      <CaretDown {...props} />
    </Box>
  );
};
const Select = React.forwardRef((props: ISelectProps, ref) => {
  const { error, helperText, label, options, required, ...selectProps } = props;
  const [value, setValue] = useState<string>(
    (props.defaultValue as string) || ''
  );

  const handleChange = (e: SelectChangeEvent<unknown>, c: React.ReactNode) => {
    if (typeof e.target.value === 'string') {
      setValue(e.target.value);
    }
    // @ts-expect-error handle error
    props.onChange(e, c);
  };

  return (
    <FormGroup
		  className={[
		    classes.Container,
		    error && classes.Error,
		    props.disabled && classes.Disabled
		  ].join(' ')}
		  >
      <Box>
        <MuiSelect
				  displayEmpty
				  fullWidth
				  ref={ref}
				  IconComponent={selectIcon}
				  className={[classes.Select, !!value && classes.Filled].join(' ')}
				  {...selectProps}
				  defaultValue={props.defaultValue || ''}
				  onChange={handleChange}
        >
          {options.map((item, i) => (
            <MenuItem key={i} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </MuiSelect>
        <FormLabel className={classes.Label}>
          {label}{' '}
          <Render in={!!required}>
            <span className={classes.Asteric}>*</span>
          </Render>
        </FormLabel>
        <FormHelperText
				  sx={{ position: props.helperText ? 'static' : 'absolute' }}
				  className={classes.HelperText}
        >
          {helperText as string}
        </FormHelperText>
      </Box>
    </FormGroup>
  );
});

Select.displayName = 'Select';
export default Select;
