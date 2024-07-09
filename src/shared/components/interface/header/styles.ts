import { Box, styled } from '@mui/material'

export const HeaderContainer = styled(Box)(({ theme }) => ({
  height: '120px',
  paddingTop: '25px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
}))

export const ContentWrapper = styled(Box)(({ theme }) => ({
  width: '100vw',
  padding: '0 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    // width: '85vw',
    padding: '0 0',
  },
}))
