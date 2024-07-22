import React from 'react'
import { AppThemeProvider, useAppThemeContext } from './theme'
import { ToastProvider } from './Toast'
import { TaskProvider } from './task'
import { DarkTheme, LightTheme } from '../themes'
import { css, Global } from '@emotion/react'
import { globalStyles } from '../../globalStyles'

interface Props {
  children: React.ReactNode
}

const InnerAppProvider: React.FC<Props> = ({ children }) => {
  const { themeName } = useAppThemeContext()
  const theme = themeName === 'light' ? LightTheme : DarkTheme

  return (
    <>
      <Global styles={css(globalStyles(theme))} />
      {children}
    </>
  )
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <AppThemeProvider>
    <TaskProvider>
      <ToastProvider>
        <InnerAppProvider>{children}</InnerAppProvider>
      </ToastProvider>
    </TaskProvider>
  </AppThemeProvider>
)

export { AppProvider }
