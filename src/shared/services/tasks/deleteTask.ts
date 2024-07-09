import { LOCAL_STORAGE_KEY, localStorageSchema } from '..'
import { defaultCategories } from '../../utils/defaultCategories'

export function deleteTask(taskId: string) {
  try {
    const existingData: localStorageSchema = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ||
        `{"tasks": [], "categories": [], "tasks_categories": ${defaultCategories}}`,
    )

    if (!Array.isArray(existingData.tasks)) {
      throw new Error('Tasks data in localStorage is corrupted')
    }

    if (!Array.isArray(existingData.tasks_categories)) {
      throw new Error('Tasks-Categories data in localStorage is corrupted')
    }

    const updatedTasks = existingData.tasks.filter(
      (task: any) => task.id !== taskId,
    )

    const updatedTasksCategories = existingData.tasks_categories.filter(
      (taskCategory: any) => taskCategory.task_id !== taskId,
    )

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        ...existingData,
        tasks: updatedTasks,
        tasks_categories: updatedTasksCategories,
      }),
    )
  } catch (error) {
    console.error('Error deleting task in localStorage:', error)
    throw new Error('Failed to delete task. Please try again.')
  }
}
