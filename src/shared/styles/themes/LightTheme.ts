import { createTheme } from '@mui/material'

export const LIGHT_THEME = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(78, 168, 222)',
      dark: 'rgba(30, 111, 159)',
    },
    secondary: {
      main: 'rgba(130, 132, 244)',
      dark: 'rgba(94, 96, 206)',
    },
    text: {
      primary: '#000',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    allVariants: {
      color: '#000',
    },
  },
})
