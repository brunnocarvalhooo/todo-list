import { Box, Card, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { StyledAvatar } from './styles'

export const ProfileCard = () => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box display="flex" justifyContent="center">
      <Card
        variant="elevation"
        sx={{
          position: mdDown ? undefined : 'fixed',
          zIndex: 2,
          top: '30px',
          p: 2,
          borderRadius: 4,
          maxWidth: mdDown ? '90vw' : '500px',
          bgcolor:
            theme.palette.grey[theme.palette.mode === 'dark' ? 1000 : 300],
          transition: 'border 0.2s ease',
        }}
      >
        <Box display="flex" alignItems="flex-start">
          <StyledAvatar src="https://avatars.githubusercontent.com/u/129981555?s=400&u=c05cfc7a342cc1ef90c2ba4a90f6a34d0e9e93b2&v=4" />

          <Box ml={2}>
            <Typography
              variant={mdDown ? 'h6' : 'h5'}
              fontWeight="bold"
              sx={{ wordBreak: 'break-word' }}
            >
              Brunno da Silva Carvalho
            </Typography>

            <Typography
              variant={mdDown ? 'caption' : 'body2'}
              sx={{ wordBreak: 'break-word' }}
            >
              brunnocarval@gmail.com{' '}
              <span style={{ fontSize: '0.8rem' }}>- entrou em 21/03/2005</span>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}
