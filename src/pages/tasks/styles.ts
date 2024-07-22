import { Box, Fab, keyframes, styled } from '@mui/material'

export const TasksContainer = styled(Box)(() => ({}))

export const ListContainer = styled(Box)(({ theme }) => ({
  padding: '80px 0',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  marginTop: '20px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderTop: '1px solid',
  borderTopColor: theme.palette.grey[600],
  borderRadius: '8px',

  '& > h4': {
    marginTop: '24px',
    textAlign: 'center',
  },

  '& > p': {
    marginTop: '8px',
    fontSize: '0.90rem',
    color: theme.palette.grey[600],
    textAlign: 'center',
  },
}))

export const slideInUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

export const slideOutDown = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`

export const RollUpFab = styled(Fab)(({ theme }) => ({
  background: theme.palette.primary.main,
  boxShadow: 'none',
  transition: 'transform 0.3s ease, background 0.3s',

  '& > svg': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.common.black
        : theme.palette.common.white,
  },

  '&:focus': {
    boxShadow: 'none',
    background: theme.palette.primary.main,

    '& > svg': {
      color: '#fff',
    },
  },

  '&:hover': {
    background: theme.palette.primary.dark,
    transform: 'translateY(-5px)',

    '& > svg': {
      color: '#fff',
    },
  },
}))
