import React from 'react'

import { AppContainer } from './shared/styles/AppStyles'
import { Global, css } from '@emotion/react'

import { TaskProvider } from './shared/contexts/taskContext'
import { Footer } from './shared/components'
import { globalStyles } from './shared/styles/globalStyles'
import {
  AppThemeProvider,
  useAppThemeContext,
} from './shared/contexts/themeContext'
import { DARK_THEME, LIGHT_THEME } from './shared/styles/themes'
import { ScreenProvider } from './shared/contexts/screenContext'
import { useScreen } from './shared/hooks/useScreen'

import { Home, Profile } from './screens'

import { FaUser, FaTasks } from 'react-icons/fa'

const AppContent = () => {
  const { screens, activeScreen, setScreens } = useScreen()

  setScreens([
    {
      name: 'tasks',
      component: <Home />,
      icon: <FaTasks size={28} />,
    },
    {
      name: 'profile',
      component: <Profile />,
      icon: <FaUser size={24} />,
    },
  ])

  const { themeName } = useAppThemeContext()
  const theme = themeName === 'light' ? LIGHT_THEME : DARK_THEME

  return (
    <>
      <Global styles={css(globalStyles(theme))} />
      <AppContainer>
        {
          screens.find((screen) => screen.name === activeScreen?.name)
            ?.component
        }
      </AppContainer>
      <Footer />
    </>
  )
}

export function App() {
  return (
    <AppThemeProvider>
      <ScreenProvider>
        <TaskProvider>
          <AppContent />
        </TaskProvider>
      </ScreenProvider>
    </AppThemeProvider>
  )
}
