import { LOCAL_STORAGE_KEY } from '..'
import { taskSchema } from './createTask'
import { z } from 'zod'

type Task = z.infer<typeof taskSchema>

export function updateTask(updatedTask: Task) {
  const parsedTask = taskSchema.safeParse(updatedTask)

  if (!parsedTask.success) {
    throw new Error('Invalid task structure')
  }

  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!existingDataJSON) {
      throw new Error('No data found in localStorage')
    }

    const existingData = JSON.parse(existingDataJSON)

    if (!Array.isArray(existingData.tasks)) {
      throw new Error('Tasks data in localStorage is corrupted')
    }

    const taskIndex = existingData.tasks.findIndex(
      (task: Task) => task.id === updatedTask.id,
    )

    if (taskIndex === -1) {
      throw new Error(`Task with ID ${updatedTask.id} not found`)
    }

    existingData.tasks[taskIndex] = parsedTask.data

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData))
  } catch (error) {
    console.error('Error updating task in localStorage:', error)
    throw new Error('Failed to update task. Please try again.')
  }
}
