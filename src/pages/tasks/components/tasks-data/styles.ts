import { Box, Typography, styled } from '@mui/material'

export const InfoContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  whiteSpace: 'nowrap',

  '& > span': {
    fontWeight: 'bold',
  },
}))

export const StyledTypographyData = styled(Typography)(({ theme }) => ({
  background: theme.palette.grey[theme.palette.mode === 'light' ? 500 : 600],
  padding: '5px 10px',
  borderRadius: '8px',
  fontWeight: 'bold',
  color: theme.palette.common.white,
}))
