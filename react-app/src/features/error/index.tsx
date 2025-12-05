import React from 'react';
import { Container } from '@mui/material';
import NotFound from './not-found';
import OtherError from './other-error';

interface ErrorPageProps {
    status: number;
    message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({message, status}) => {
  return (
        <Container maxWidth='lg'>
            {
              status === 404 ?
                <NotFound />
                :
                <OtherError message={message} status={status} />
            }

        </Container>
  )
}

export default ErrorPage;