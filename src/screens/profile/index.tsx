import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { ProfileCard } from './components'
import { useAppThemeContext } from '../../shared/contexts/themeContext'

export { Typography } from '@mui/material'

export const Profile = () => {
  const { toggleTheme } = useAppThemeContext()

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    document.title = 'Profile - ToDo'
  }, [])

  return (
    <Box width={mdDown ? '90vw' : '736px'}>
      <ProfileCard />

      <Button onClick={toggleTheme} variant="contained" sx={{ mt: 15 }}>
        CU
      </Button>
    </Box>
  )
}
