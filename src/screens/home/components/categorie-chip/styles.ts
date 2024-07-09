import { Chip, styled } from '@mui/material'

type StyledCategorieChipProps = {
  categorieColor: string
}

export const StyledCategorieChip = styled(Chip)<StyledCategorieChipProps>(
  ({ categorieColor }) => ({
    height: '26px',
    backgroundColor: categorieColor,
    fontSize: '0.95rem',
    cursor: 'pointer',
  }),
)
