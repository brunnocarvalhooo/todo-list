import { LOCAL_STORAGE_KEY, localStorageSchema } from '..'
import { Category, TasksCategories } from '../../dtos'

export function deleteCategory(categoryId: string): void {
  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!existingDataJSON) {
      throw new Error('No data found in localStorage')
    }

    const existingData: localStorageSchema = JSON.parse(existingDataJSON)

    if (!Array.isArray(existingData.categories)) {
      throw new Error('Categories data in localStorage is corrupted')
    }

    if (!Array.isArray(existingData.tasks_categories)) {
      throw new Error('Tasks-Categories data in localStorage is corrupted')
    }

    existingData.tasks_categories = existingData.tasks_categories.map(
      (taskCategory: TasksCategories) => {
        if (taskCategory.category_id === categoryId) {
          return { ...taskCategory, category_id: '' }
        }
        return taskCategory
      },
    )

    existingData.categories = existingData.categories.filter(
      (category: Category) => category.id !== categoryId,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData))
  } catch (error) {
    console.error('Error deleting category from localStorage:', error)
    throw new Error('Failed to delete category. Please try again.')
  }
}
