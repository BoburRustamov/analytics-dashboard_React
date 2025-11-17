import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { ReactNode } from 'react';

const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
  defaultRadius: 'md',
  colors: {
    dark: [
      '#C9D1D9',
      '#B1BAC4',
      '#8B949E',
      '#6E7681',
      '#484F58',
      '#30363D',
      '#21262D',
      '#161B22',
      '#0D1117',
      '#010409',
    ],
  },
  components: {
    Button: {
      defaultProps: {
        size: 'sm',
      },
    },
    TextInput: {
      defaultProps: {
        size: 'sm',
      },
    },
    Select: {
      defaultProps: {
        size: 'sm',
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
      },
    },
  },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  );
};