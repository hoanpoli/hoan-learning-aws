import { createTheme } from '@mui/material';

import { components } from './components';
import { palette } from './palette';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = createTheme({
  palette: palette,
  components: components,
  spacing: spacing,
  typography: typography
});
