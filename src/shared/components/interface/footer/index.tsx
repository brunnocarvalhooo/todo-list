import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import toDoLogoSVG from '../../../../assets/todo-list-logo.svg'

export function Footer() {
  const theme = useTheme()

  return (
    <Box
      height="20vh"
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      bgcolor={
        theme.palette.mode === 'light'
          ? theme.palette.common.white
          : theme.palette.common.black
      }
    >
      <img
        src={toDoLogoSVG}
        alt="ToDo Logo"
        style={{ width: '100px', marginBottom: '1rem' }}
      />
      <Typography variant="caption">ToDo &copy; All Rights Reserved</Typography>
    </Box>
  )
}
