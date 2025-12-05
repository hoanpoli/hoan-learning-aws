import React from 'react';
import { ThemeProvider } from '@mui/material';
import { createGenerateClassName, StylesProvider } from '@mui/styles';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.tsx';

import { theme } from './theme';
import './theme/global.css';

const generateClassName = createGenerateClassName({
  seed: 'app1'
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
      retry: false,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StylesProvider generateClassName={generateClassName} injectFirst={true}>
      <ThemeProvider theme={theme}>
        <Router>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  </React.StrictMode>
);
