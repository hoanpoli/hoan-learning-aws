import React from 'react';
import { Box } from '@mui/material';
import ButtonPrimaryLight from '../Button/ButtonPrimaryLight';
import classes from './InputSubscribe.module.scss';

const InputSubscribe: React.FC = () => {
  return (
    <Box className={classes.InputBox}>
      <input placeholder='Your Email' className={classes.Input} />
      <ButtonPrimaryLight size='md'>Subscribe</ButtonPrimaryLight>
    </Box>
  );
};

export default InputSubscribe;
