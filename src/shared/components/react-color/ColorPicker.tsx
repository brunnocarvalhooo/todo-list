import React, { useState } from 'react'
import { Box } from '@mui/material'
import { HuePicker, HuePickerProps, ColorResult } from 'react-color'

type ColorPickerProps = HuePickerProps & {
  initialColor: string
  onChangeColorPicker: (color: string) => void
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  initialColor,
  onChangeColorPicker,
  ...rest
}) => {
  const [color, setColor] = useState(initialColor)

  const handleChangeComplete = (colorResult: ColorResult) => {
    setColor(colorResult.hex)
    onChangeColorPicker(colorResult.hex)
  }

  return (
    <Box>
      <HuePicker
        color={color}
        onChangeComplete={handleChangeComplete}
        {...rest}
      />
    </Box>
  )
}
