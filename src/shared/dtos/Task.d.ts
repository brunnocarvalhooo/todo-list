export interface Subtask {
  id: number
  subtask: string
  completed: boolean
}

export interface Task {
  id: string
  task: string
  completed: boolean
  created_at: string
  subtasks?: Subtask[]
}
