import React, { createContext, useEffect, useState } from 'react'

import { Home, Profile } from '../../screens'

import { FaUser, FaTasks } from 'react-icons/fa'

export interface Screen {
  name: string
  component: React.ReactNode
  icon: React.ReactNode
}

export interface IScreenContextData {
  screens: Screen[]
  setScreens: React.Dispatch<React.SetStateAction<Screen[]>>

  activeScreen: Screen | undefined
  setActiveScreen: React.Dispatch<React.SetStateAction<Screen | undefined>>
}

export const ScreenContext = createContext({} as IScreenContextData)

interface IScreenProviderProps {
  children: React.ReactNode
}

export const ScreenProvider: React.FC<IScreenProviderProps> = ({
  children,
}) => {
  const [screens, setScreens] = useState<Screen[]>([
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

  const [activeScreen, setActiveScreen] = useState<Screen | undefined>(
    undefined,
  )

  useEffect(() => {
    if (screens.length > 0 && !activeScreen) {
      setActiveScreen(screens.find((screen) => screen.name === 'tasks'))
    }
  }, [screens, activeScreen])

  return (
    <ScreenContext.Provider
      value={{
        screens,
        setScreens,
        activeScreen,
        setActiveScreen,
      }}
    >
      {children}
    </ScreenContext.Provider>
  )
}
