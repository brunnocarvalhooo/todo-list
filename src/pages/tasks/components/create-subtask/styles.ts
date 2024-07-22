import { Divider, styled } from '@mui/material'

export const StyledDividerLink = styled(Divider)(({ theme }) => ({
  border: '1px solid',
  marginLeft: '20px',
  borderColor: theme.palette.grey[theme.palette.mode === 'light' ? 500 : 700],
}))
