import { v4 as uuid } from 'uuid'
import { LOCAL_STORAGE_KEY, localStorageSchema } from '..'
import { Category, Task, TasksCategories } from '../../dtos'

export function updateTaskCategory(taskId: string, newCategoryId?: string) {
  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!existingDataJSON) {
      throw new Error('No data found in localStorage')
    }

    const existingData: localStorageSchema = JSON.parse(existingDataJSON)

    if (!Array.isArray(existingData.tasks)) {
      throw new Error('Tasks data in localStorage is corrupted')
    }

    if (!Array.isArray(existingData.categories)) {
      throw new Error('Categories data in localStorage is corrupted')
    }

    if (!Array.isArray(existingData.tasks_categories)) {
      throw new Error('Tasks-Categories data in localStorage is corrupted')
    }

    const task = existingData.tasks.find((task: Task) => task.id === taskId)
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`)
    }

    if (newCategoryId) {
      const category = existingData.categories.find(
        (cat: Category) => cat.id === newCategoryId,
      )
      if (!category) {
        throw new Error(`Category with ID ${newCategoryId} not found`)
      }
    }

    const taskCategoryIndex = existingData.tasks_categories.findIndex(
      (tc: TasksCategories) => tc.task_id === taskId,
    )

    if (taskCategoryIndex === -1) {
      existingData.tasks_categories.push({
        id: uuid(),
        task_id: taskId,
        category_id: newCategoryId || '',
      })
    } else {
      existingData.tasks_categories[taskCategoryIndex].category_id =
        newCategoryId || ''
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData))
  } catch (error) {
    console.error('Error updating task category in localStorage:', error)
    throw new Error('Failed to update task category. Please try again.')
  }
}
