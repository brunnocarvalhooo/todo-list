import { createTheme } from '@mui/material'

export const DARK_THEME = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(78, 168, 222)',
      dark: 'rgba(30, 111, 159)',
    },
    secondary: {
      main: 'rgba(130, 132, 244)',
      dark: 'rgba(94, 96, 206)',
    },
    text: {
      primary: '#fff',
    },
    background: {
      default: '#111112',
      paper: '#111112',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    allVariants: {
      color: '#fff',
    },
  },
})
