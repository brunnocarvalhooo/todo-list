import React, { FC, useEffect, useState } from 'react'

import {
  Select as MuiSelect,
  FormControl,
  SelectProps,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
} from '@mui/material'
import { useField } from '@unform/core'

export interface IOptionProps {
  value: string
  label: string
}

type VSelectProps = SelectProps & {
  name: string
  label?: string
  options: IOptionProps[]
  onChange?: (value: string) => void
  color?: string
}

export const VSelect: FC<VSelectProps> = ({
  name,
  label,
  options,
  onChange,
  color,
  ...rest
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name)

  const [value, setValue] = useState(defaultValue || '')
  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string
    setValue(selectedValue)

    if (error) {
      clearError()
    }

    // Chama a função onChange fornecida como propriedade, se existir
    if (onChange) {
      onChange(selectedValue)
    }
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })
  }, [fieldName, registerField, value])

  return (
    <>
      <FormControl fullWidth error={!!error}>
        <InputLabel color={color || 'secondary'} id="select-label">
          {label}
        </InputLabel>
        <MuiSelect
          {...rest}
          sx={{ zIndex: 0 }}
          title={label}
          color={color || 'secondary'}
          labelId="select-label"
          id="simple-select"
          value={value}
          label={label}
          onChange={(e) => {
            handleChange(e)
          }}
          onKeyDown={(e) => {
            error && clearError()
            rest.onKeyDown?.(e)
          }}
        >
          {options.map((option: IOptionProps) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </>
  )
}
