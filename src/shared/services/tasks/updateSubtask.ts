import { LOCAL_STORAGE_KEY, localStorageSchema, subtaskSchema } from '..'
import { Subtask, Task } from '../../dtos/Task'
import { z } from 'zod'

export function updateSubtasks(taskId: string, updatedSubtasks: Subtask[]) {
  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!existingDataJSON) {
      throw new Error('No tasks found in localStorage')
    }

    const existingData: localStorageSchema = JSON.parse(existingDataJSON)

    if (!Array.isArray(existingData.tasks)) {
      throw new Error('Tasks data in localStorage is corrupted')
    }

    const parsedSubtasks = z.array(subtaskSchema).safeParse(updatedSubtasks)
    if (!parsedSubtasks.success) {
      throw new Error('Invalid subtasks structure')
    }

    const taskToUpdateIndex = existingData.tasks.findIndex(
      (task: Task) => task.id === taskId,
    )

    if (taskToUpdateIndex === -1) {
      throw new Error(`Task with ID ${taskId} not found`)
    }

    existingData.tasks[taskToUpdateIndex] = {
      ...existingData.tasks[taskToUpdateIndex],
      subtasks: parsedSubtasks.data,
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData))
  } catch (error) {
    console.error('Error updating subtasks in localStorage:', error)
    throw new Error('Failed to update subtasks. Please try again.')
  }
}
