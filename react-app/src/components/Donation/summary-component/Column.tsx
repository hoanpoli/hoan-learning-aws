import React from 'react';
import { Grid, Typography } from '@mui/material';
import classes from '@/features/donation/styles/Summary.module.scss';

interface ColumnPersonalDetailsProps {
  title: string;
  value?: string | number;
}

const ColumnPersonalDetails: React.FC<ColumnPersonalDetailsProps> = ({ title, value }) => {
  return (
    <>
      <Grid item md={6} xs={12}>
        <Typography className={classes.TextLabel}>{title}</Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography className={classes.TextValue}>{value}</Typography>
      </Grid>
    </>
  );
};

export default ColumnPersonalDetails;
