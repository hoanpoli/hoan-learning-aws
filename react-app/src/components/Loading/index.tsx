import React from 'react';
import { CircularProgress, Stack } from '@mui/material';

const LoadingComponent: React.FC = () => {
  return (
    <Stack direction='row' justifyContent='center' alignItems='center' height='150px'>
      <CircularProgress />
    </Stack>
  );
};

export default LoadingComponent;