import React from 'react'
import { Home, Profile } from '../../screens'

import { FaUser, FaTasks } from 'react-icons/fa'

interface Screen {
  name: string
  component: React.ReactNode
  icon: React.ReactNode
}

export const screens: Screen[] = [
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
]
