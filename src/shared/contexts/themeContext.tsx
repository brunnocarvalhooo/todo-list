import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { Box, ThemeProvider } from '@mui/material'
import { LIGHT_THEME, DARK_THEME } from '../styles/themes'
import { env } from '../environment'

export interface IThemeContextData {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<IThemeContextData | undefined>(undefined)

export const useAppThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useAppThemeContext must be used within a ThemeProvider')
  }
  return context
}

interface IAppThemeProviderProps {
  children: React.ReactNode
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>(
    () =>
      (localStorage.getItem(`${env.APP_NAME}:theme`) as 'light' | 'dark') ||
      'light',
  )

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === 'light' ? 'dark' : 'light',
    )
  }, [])

  useEffect(() => {
    localStorage.setItem(`${env.APP_NAME}:theme`, themeName)
  }, [themeName])

  const theme = useMemo(() => {
    return themeName === 'light' ? LIGHT_THEME : DARK_THEME
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box sx={{ overflow: 'hidden' }}>{children}</Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
