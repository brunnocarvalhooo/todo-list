import React from 'react'
import 'react-toastify/dist/ReactToastify.css'

import { AppProvider } from './shared/hooks'
import { Tasks } from './pages/tasks'

export const App: React.FC = () => (
  <AppProvider>
    <Tasks />
  </AppProvider>
)
