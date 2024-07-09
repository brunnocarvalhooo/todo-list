import { useContext } from 'react'
import { IScreenContextData, ScreenContext } from '../contexts/screenContext'

function useScreen(): IScreenContextData {
  const context = useContext(ScreenContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

export { useScreen }
