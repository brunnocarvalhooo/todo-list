import { z } from 'zod'
import { LOCAL_STORAGE_KEY } from '..'
import { defaultCategories } from '../../utils/defaultCategories'
import { v4 as uuid } from 'uuid'

export const subtaskSchema = z.object({
  id: z.number(),
  subtask: z.string(),
  completed: z.boolean(),
})

export const taskSchema = z.object({
  id: z.string(),
  task: z.string(),
  completed: z.boolean(),
  created_at: z.string(),
  subtasks: z.array(subtaskSchema),
})

type Task = z.infer<typeof taskSchema>

export function createTask(task: Task, category_id?: string) {
  const parsedTask = taskSchema.safeParse(task)

  if (!parsedTask.success) {
    throw new Error('Invalid task structure')
  }

  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    let existingData
    if (existingDataJSON) {
      existingData = JSON.parse(existingDataJSON)
    } else {
      existingData = {
        tasks: [],
        categories: defaultCategories,
        tasks_categories: [],
      }
    }

    if (!Array.isArray(existingData.tasks)) {
      throw new Error('Tasks data in localStorage is corrupted')
    }

    if (!Array.isArray(existingData.categories)) {
      throw new Error('Categories data in localStorage is corrupted')
    }

    if (!Array.isArray(existingData.tasks_categories)) {
      throw new Error('Tasks-Categories data in localStorage is corrupted')
    }

    const updatedTasks = [...existingData.tasks, parsedTask.data]
    const updatedTasksCategories = [
      ...existingData.tasks_categories,
      {
        task_id: parsedTask.data.id,
        category_id: category_id || '',
        id: uuid(),
      },
    ]

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        tasks: updatedTasks,
        categories: existingData.categories,
        tasks_categories: updatedTasksCategories,
      }),
    )
  } catch (error) {
    console.error('Error managing tasks in localStorage:', error)
    throw new Error('Failed to create task. Please try again.')
  }
}
