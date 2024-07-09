import React from 'react'
import { ChipProps } from '@mui/material'
import { StyledCategorieChip } from './styles'
import { Category } from '../../../../shared/dtos/Category'
import { truncateText } from '../../../../shared/utils/masks'
import { isColorLight } from '../../../../shared/utils/colorFuncs'

type Props = ChipProps & {
  categorie: Category
}

export function CategorieChip({ categorie, ...rest }: Props) {
  const textColor = isColorLight(categorie.color) ? 'black' : 'white'

  return (
    <StyledCategorieChip
      categorieColor={categorie.color}
      label={truncateText(categorie.name, 20)}
      style={{ color: textColor }}
      {...rest}
    />
  )
}
