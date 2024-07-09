import { Accordion, Box, styled } from '@mui/material'

export const StyledTask = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '25px 30px',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  background: theme.palette.grey[theme.palette.mode === 'light' ? 800 : 100],
  marginTop: '20px',
  borderRadius: '8px',
  transition: 'transform 0.1s ease',

  '&:hover': {
    transform: 'scale(1.01)',
  },

  '&:last-child': {
    marginBottom: '50px',
  },

  [theme.breakpoints.down('md')]: {
    padding: '15px 15px',
  },
}))

export const StyledTaskAccordion = styled(Accordion)(({ theme }) => ({
  alignItems: 'flex-start',
  background: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 900],
  marginTop: '20px',
  borderRadius: '8px',
  transition: 'transform 0.1s ease',

  '&:hover': {
    transform: 'scale(1.01)',
  },

  '&:last-child': {
    marginBottom: '50px',
  },

  '& .task-title': {
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    margin: '6px 0 2px 0',
  },
}))
