import { IThemeContextData, useAppThemeContext } from '../contexts/themeContext'

function useAppTheme(): IThemeContextData {
  return useAppThemeContext()
}

export { useAppTheme }
