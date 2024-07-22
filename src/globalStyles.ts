import { Theme } from '@mui/material'

export const globalStyles = (theme: Theme) => ({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box' as const,
  },

  body: {
    WebkitFontSmoothing: 'antialiased' as const,
    fontFamily: 'Inter, sans-serif' as const,
    fontWeight: 400,

    fontSize: '1rem' as const,
    '&::-webkit-scrollbar': {
      width: '10px' as const,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(38, 38, 38, 1)'
          : 'rgba(200, 200, 200, 1)',
    },

    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(51, 51, 51, 1)'
          : 'rgba(150, 150, 150, 1)',
      cursor: 'grab' as const,
    },

    '&::-webkit-scrollbar-thumb:active': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(51, 51, 51, 1)'
          : 'rgba(150, 150, 150, 1)',
      cursor: 'grabbing' as const,
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(0, 0, 0, 1)'
          : 'rgba(255, 255, 255, 1)',
    },
  },

  'body, input, textarea, button': {
    fontFamily: "'Inter', sans-serif" as const,
    fontWeight: 400,
    fontSize: '1rem' as const,

    backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
  },
})
