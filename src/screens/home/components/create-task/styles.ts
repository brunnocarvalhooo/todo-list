import { Button, styled } from '@mui/material'
import { VTextField } from '../../../../shared/components/form'

export const SearchInput = styled(VTextField)(({ theme }) => ({
  width: '95%',
  borderRadius: '8px',
  height: '3rem',
  background: theme.palette.grey[theme.palette.mode === 'dark' ? 900 : 100],

  '& .css-97albg-MuiInputBase-root-MuiOutlinedInput-root': {
    borderRadius: '8px',
    height: '3rem',
  },

  '& .css-atu9cc-MuiInputBase-root-MuiOutlinedInput-root': {
    borderRadius: '8px',
    height: '3rem',
  },

  '& .css-4xkgy-MuiInputBase-root-MuiOutlinedInput-root': {
    borderRadius: '8px',
    height: '3rem',
  },

  [theme.breakpoints.down('md')]: {
    height: '3rem',
    paddingBottom: '30px',
  },
}))

export const CreateTaskButton = styled(Button)(({ theme }) => ({
  width: '20%',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',

  borderRadius: '8px',
  border: 'none',
  gap: '5px',

  background: theme.palette.primary.dark,
  color: '#fff',

  fontWeight: 'bold',
  fontSize: '1rem',
  padding: '0 20px',

  transition: 'all 0.2s',
  textTransform: 'capitalize',

  '&:hover': {
    background: theme.palette.primary.main,
  },
}))
