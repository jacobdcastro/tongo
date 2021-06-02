import { createMuiTheme } from '@material-ui/core';

// TODO add dark/light theme

interface StyledThemeTypes {
  green: string;
  bg: string;
  fg: string;
  hText: string;
  subHText: string;
  pText: string;
  border: string;
}

export const styledTheme: StyledThemeTypes = {
  green: '#2FE078',
  bg: '#FFFFFF',
  fg: '#222629',
  hText: '#222629',
  subHText: '#919396',
  pText: '#222629',
  border: '#EAEFF5',
};

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2FE078',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});
