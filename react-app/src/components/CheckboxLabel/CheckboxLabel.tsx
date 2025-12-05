import type { ReactNode } from 'react';
import React, { useId } from 'react';
import { Box, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

import CheckedIcon from '@/assets/checkbox-checked.svg';
import UncheckIcon from '@/assets/checkbox-uncheck.svg';
import { secondary } from '@/theme/colors';

export interface CheckboxProps {
  label: ReactNode;
  disabled?: boolean;
  checked?: boolean;
  align?: 'center' | 'top';
  onChange?: (_val: boolean) => void;
}

const styles = {
  box: { marginLeft: '7px' },
  controlLabel: {
    '& span.MuiFormControlLabel-label': {
      color: secondary[200],
      marginLeft: '10px',
      fontWeight: 400,
      fontSize: '14px'
    },
    '.Mui-disabled': {
      color: `${secondary[500]}!important`
    }
  },
  muiCheckbox: {
    position: 'relative',
    marginLeft: '5px',
    marginTop: '0px',
    '&:disabled': {
      pointerEvents: 'none'
    }
  }
};

const CheckboxLabel: React.FC<CheckboxProps> = ({
  align = 'center',
  checked = false,
  disabled,
  label,
  onChange
}) => {
  const id = useId();

  const controlLabelSx = {
    alignItems: align === 'center' ? 'center' : 'flex-start',
    '& span.MuiCheckbox-root': {
      marginTop: align === 'center' ? '0px' : '4px'
    },
    ...styles.controlLabel
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <Box data-testid='checkbox-label' id={id} sx={styles.box}>
      <FormControlLabel
			  label={label}
			  disabled={disabled}
			  sx={controlLabelSx}
			  control={
          <MuiCheckbox
					  sx={styles.muiCheckbox}
					  onChange={handleChange}
					  checked={checked}
					  icon={<img style={{ position: 'absolute', width: '18px', height: '18px' }} src={UncheckIcon} />}
					  checkedIcon={
              <img style={{ position: 'absolute' }} src={CheckedIcon} />
					  }
          />
			  }
      />
    </Box>
  );
};

export default CheckboxLabel;
