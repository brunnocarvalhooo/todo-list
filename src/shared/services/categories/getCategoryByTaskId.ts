import { Category, TasksCategories, Task } from '../../dtos'
import { LOCAL_STORAGE_KEY, localStorageSchema } from '..'

export function getCategoryByTaskId(taskId: string): Category | null {
  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!existingDataJSON) {
      throw new Error('No data found in localStorage')
    }

    const existingData: localStorageSchema = JSON.parse(existingDataJSON)

    if (
      !Array.isArray(existingData.tasks) ||
      !Array.isArray(existingData.categories) ||
      !Array.isArray(existingData.tasks_categories)
    ) {
      throw new Error('Data in localStorage is corrupted')
    }

    const task = existingData.tasks.find((task: Task) => task.id === taskId)

    if (!task) {
      return null
    }

    const taskCategory = existingData.tasks_categories.find(
      (taskCategory: TasksCategories) => taskCategory.task_id === taskId,
    )

    if (!taskCategory) {
      return null
    }

    const category = existingData.categories.find(
      (category: Category) => category.id === taskCategory.category_id,
    )

    return category || null
  } catch (error) {
    console.error(
      'Error fetching category by task ID from localStorage:',
      error,
    )
    throw new Error('Failed to fetch category. Please try again.')
  }
}
