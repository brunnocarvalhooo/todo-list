import { Category } from '../../dtos/Category'
import { LOCAL_STORAGE_KEY, localStorageSchema } from '..'

export function getCategories(): Category[] {
  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!existingDataJSON) {
      return []
    }

    const existingData: localStorageSchema = JSON.parse(existingDataJSON)

    if (!Array.isArray(existingData.categories)) {
      throw new Error('Categories data in localStorage is corrupted')
    }

    return existingData.categories
  } catch (error) {
    console.error('Error retrieving categories from localStorage:', error)
    return []
  }
}
