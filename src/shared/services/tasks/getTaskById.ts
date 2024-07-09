import { Task } from '../../dtos/Task'
import { LOCAL_STORAGE_KEY, localStorageSchema, taskSchema } from '..'

export function getTaskById(taskId: string): Task | null {
  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!existingDataJSON) {
      throw new Error('No data found in localStorage')
    }

    const existingData: localStorageSchema = JSON.parse(existingDataJSON)

    if (!Array.isArray(existingData.tasks)) {
      throw new Error('Tasks data in localStorage is corrupted')
    }

    const foundTask = existingData.tasks.find(
      (task: Task) => task.id === taskId,
    )

    if (!foundTask) {
      return null
    }

    const parsedTask = taskSchema.safeParse(foundTask)

    if (!parsedTask.success) {
      throw new Error('Invalid task structure found in localStorage')
    }

    return parsedTask.data
  } catch (error) {
    console.error('Error fetching task from localStorage:', error)
    throw new Error('Failed to fetch task. Please try again.')
  }
}
