import { LOCAL_STORAGE_KEY, localStorageSchema } from '..'
import { defaultCategories } from '../../utils/defaultCategories'

export function resetDefaultCategories() {
  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!existingDataJSON) {
      throw new Error('No data found in localStorage')
    }

    const existingData: localStorageSchema = JSON.parse(existingDataJSON)

    if (!Array.isArray(existingData.categories)) {
      throw new Error('Categories data in localStorage is corrupted')
    }

    if (existingData.categories.length === 0) {
      existingData.categories = defaultCategories

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData))
    }
  } catch (error) {
    console.error('Error resetting categories in localStorage:', error)
    throw new Error('Failed to reset categories. Please try again.')
  }
}
