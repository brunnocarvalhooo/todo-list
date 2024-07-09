import { Task } from '../../dtos/Task'
import { LOCAL_STORAGE_KEY } from '..'

export function deleteSubtask(taskId: string, subtaskId: number) {
  try {
    const existingDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!existingDataJSON) {
      throw new Error('No tasks found in localStorage')
    }

    const existingData = JSON.parse(existingDataJSON)

    if (!Array.isArray(existingData.tasks)) {
      throw new Error('Tasks data in localStorage is corrupted')
    }

    const taskToUpdateIndex = existingData.tasks.findIndex(
      (task: Task) => task.id === taskId,
    )

    if (taskToUpdateIndex === -1) {
      throw new Error(`Task with ID ${taskId} not found`)
    }

    const taskToUpdate = existingData.tasks[taskToUpdateIndex]
    const updatedSubtasks = taskToUpdate.subtasks.filter(
      (subtask) => subtask.id !== subtaskId,
    )

    existingData.tasks[taskToUpdateIndex] = {
      ...taskToUpdate,
      subtasks: updatedSubtasks,
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData))
  } catch (error) {
    console.error('Error deleting subtask from localStorage:', error)
    throw new Error('Failed to delete subtask. Please try again.')
  }
}
