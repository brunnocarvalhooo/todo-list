import { LOCAL_STORAGE_KEY, localStorageSchema } from '..'
import { Category } from '../../dtos'

export function updateCategory(updatedCategory: Category): void {
  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!existingDataJSON) {
      throw new Error('No data found in localStorage')
    }

    const existingData: localStorageSchema = JSON.parse(existingDataJSON)

    if (!Array.isArray(existingData.categories)) {
      throw new Error('Categories data in localStorage is corrupted')
    }

    // Find the index of the category to be updated
    const categoryIndex = existingData.categories.findIndex(
      (category) => category.id === updatedCategory.id,
    )

    if (categoryIndex === -1) {
      throw new Error(`Category with ID ${updatedCategory.id} not found`)
    }

    // Update the category at the found index
    existingData.categories[categoryIndex] = updatedCategory

    // Update the localStorage with the updated category
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData))
  } catch (error) {
    console.error('Error updating category in localStorage:', error)
    throw new Error('Failed to update category. Please try again.')
  }
}
