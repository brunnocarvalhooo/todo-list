import { LOCAL_STORAGE_KEY, localStorageSchema } from '..'
import { Category } from '../../dtos'

export function createCategory(newCategory: Category) {
  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!existingDataJSON) {
      throw new Error('No data found in localStorage')
    }

    const existingData: localStorageSchema = JSON.parse(existingDataJSON)

    if (!Array.isArray(existingData.categories)) {
      throw new Error('Categories data in localStorage is corrupted')
    }

    existingData.categories.push(newCategory)

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData))
  } catch (error) {
    console.error('Error creating new category in localStorage:', error)
    throw new Error('Failed to create new category. Please try again.')
  }
}
