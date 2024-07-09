import { Category, Task, TasksCategories } from '../dtos'
import { env } from '../environment'
import { defaultCategories } from '../utils/defaultCategories'

export * from './tasks'
export * from './categories'

export const LOCAL_STORAGE_KEY = `${env.APP_NAME}`

export interface localStorageSchema {
  categories: Category[]
  tasks: Task[]
  tasks_categories: TasksCategories[]
}

function initializeLocalStorage() {
  const existingData = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!existingData) {
    const initialData = {
      tasks: [],
      categories: defaultCategories,
      tasks_categories: [],
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData))
  }
}

initializeLocalStorage()
