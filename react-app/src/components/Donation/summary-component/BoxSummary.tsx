import React from 'react';
import { Box, Typography } from '@mui/material';
import classes from '@/features/donation/styles/Summary.module.scss';

interface BoxSummaryProps {
    title: string;
    children?: React.ReactNode;
}

const BoxSummary: React.FC<BoxSummaryProps> = ({children, title}) => {
  return(
        <Box my={5}>
            <Typography className={classes.TextTitle}>{title}</Typography>
            {children}
        </Box>
  )
}

export default BoxSummary;