import React, { createContext, useContext, useEffect, useState } from 'react'
import { Subtask, Task } from '../dtos/Task'
import { Category } from '../dtos/Category'
import { getCategories } from '../services'

export interface ITaskContextData {
  tasksList: Task[]
  setTasksList: React.Dispatch<React.SetStateAction<Task[]>>

  subtasks: Subtask[]
  setSubtasks: React.Dispatch<React.SetStateAction<Subtask[]>>

  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

export const TaskContext = createContext({} as ITaskContextData)

interface ITaskProviderProps {
  children: React.ReactNode
}

export const TaskProvider: React.FC<ITaskProviderProps> = ({ children }) => {
  const [tasksList, setTasksList] = useState<Task[]>([])
  const [subtasks, setSubtasks] = useState<Subtask[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const result = getCategories()

    setCategories(result)
  }, [])

  return (
    <TaskContext.Provider
      value={{
        tasksList,
        setTasksList,

        subtasks,
        setSubtasks,

        categories,
        setCategories,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

function useTask(): ITaskContextData {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

export { useTask }
