import { Box, styled } from '@mui/material'

export const HeaderContainer = styled(Box)(() => ({
  paddingTop: '25px',
  width: '100vw',
}))

export const ContentWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',

  padding: '0 30px',
  gap: '30px',
}))
