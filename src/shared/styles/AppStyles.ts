import { Box, styled } from '@mui/material'

export const AppContainer = styled(Box)(({ theme }) => ({
  width: '100vw',
  minHeight: '100vh',

  display: 'flex',
  justifyContent: 'center',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.common.black
      : theme.palette.common.white,
}))
