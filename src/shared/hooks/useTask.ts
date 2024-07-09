import { useContext } from 'react'
import { ITaskContextData, TaskContext } from '../contexts/taskContext'

function useTask(): ITaskContextData {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

export { useTask }
