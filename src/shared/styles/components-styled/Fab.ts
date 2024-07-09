import { Fab, styled } from '@mui/material'

export const StyledFab = styled(Fab)(({ theme }) => ({
  background: 'transparent',
  border: 'none',
  boxShadow: 'none',
  zIndex: 1,

  '&:focus': {
    background: `transparent`,
    color: theme.palette.primary.main,
    boxShadow: 'none',
  },
}))
