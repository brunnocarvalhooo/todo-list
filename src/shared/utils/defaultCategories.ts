import { Category } from '../dtos/Category'

const DEFAULT_CATEGORIE_COLOR = '#5e60ce'

export const defaultCategories: Category[] = [
  {
    id: 'professional',
    name: 'Professional',
    color: DEFAULT_CATEGORIE_COLOR,
  },
  {
    id: 'personal',
    name: 'Personal',
    color: DEFAULT_CATEGORIE_COLOR,
  },
  {
    id: 'wish-list',
    name: 'Wish List',
    color: DEFAULT_CATEGORIE_COLOR,
  },
  {
    id: 'birthdays',
    name: 'Birthdays',
    color: DEFAULT_CATEGORIE_COLOR,
  },
]

export const uncategorizedCategory = {
  id: 'uncategorized',
  name: 'Uncategorized',
  description: '',
  color: '#919191',
}

export const allCategories = {
  id: 'all',
  name: 'All categories',
  description: '',
  color: '#919191',
}
