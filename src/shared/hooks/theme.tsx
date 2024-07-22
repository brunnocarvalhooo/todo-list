import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { Box, ThemeProvider } from '@mui/material'
import { env } from '../environment'
import { DarkTheme, LightTheme } from '../themes'

interface IThemeContextData {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext({} as IThemeContextData)

export const useAppThemeContext = () => {
  return useContext(ThemeContext)
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
    if (themeName === 'light') return LightTheme

    return DarkTheme
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box bgcolor={theme.palette.background.default}>{children}</Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

function useAppTheme(): IThemeContextData {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider')
  }

  return context
}

export { ThemeProvider, useAppTheme }
