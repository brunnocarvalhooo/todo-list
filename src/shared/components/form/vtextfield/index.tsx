import React, { useEffect, useState, FC } from 'react'
import { Box, TextFieldProps, Typography, useTheme } from '@mui/material'
import { useField } from '@unform/core'

import { StyledTextField } from './styles'

type VTextFieldProps = TextFieldProps & {
  name: string
  label?: string
}

export const VTextField: FC<VTextFieldProps> = ({ name, label, ...rest }) => {
  const theme = useTheme()

  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name)

  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })
  }, [registerField, fieldName, value])

  return (
    <Box width="100%">
      <StyledTextField
        {...rest}
        sx={{
          zIndex: 0,
          borderColor: error ? '#AE2323' : theme.palette.primary.main,
        }}
        title={label}
        fullWidth
        label={label}
        error={!!error}
        // helperText={error}
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          rest.onChange?.(e)
        }}
        onKeyDown={(e) => {
          error && clearError()
          rest.onKeyDown?.(e)
        }}
      />
      <Typography
        style={{ color: '#cc2929', fontSize: '0.8rem', margin: '5px 10px' }}
      >
        {error}
      </Typography>
    </Box>
  )
}
