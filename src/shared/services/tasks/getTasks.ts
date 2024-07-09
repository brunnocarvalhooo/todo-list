import { LOCAL_STORAGE_KEY, localStorageSchema } from '..'
import {
  TimePeriod,
  getPastDate,
} from '../../../screens/home/components/tasks-data/util/FilterWithTimePeriod'
import { Category, TasksCategories } from '../../dtos'
import { Task } from '../../dtos/Task'

export function getTasks(
  time?: TimePeriod,
  category?: Category,
  status?: boolean,
): Task[] {
  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!existingDataJSON) {
      return []
    }

    const existingData: localStorageSchema = JSON.parse(existingDataJSON)

    if (!Array.isArray(existingData.tasks)) {
      throw new Error('Tasks data in localStorage is corrupted')
    }

    let filteredTasks = existingData.tasks

    if (time) {
      const pastDate = getPastDate(time)
      filteredTasks = filteredTasks.filter((task) => {
        const taskDate = new Date(task.created_at)
        if (time === TimePeriod.Today) {
          const today = new Date()
          return (
            taskDate.getDate() === today.getDate() &&
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getFullYear() === today.getFullYear()
          )
        }
        return taskDate >= pastDate
      })
    }

    if (category) {
      filteredTasks = filteredTasks.filter((task) =>
        existingData.tasks_categories.some(
          (tc: TasksCategories) =>
            tc.task_id === task.id && tc.category_id === category.id,
        ),
      )
    }

    if (status !== undefined) {
      filteredTasks = filteredTasks.filter((task) => task.completed === status)
    }

    return filteredTasks.sort(
      (a: Task, b: Task) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
  } catch (error) {
    console.error('Error retrieving tasks from localStorage:', error)
    return []
  }
}
