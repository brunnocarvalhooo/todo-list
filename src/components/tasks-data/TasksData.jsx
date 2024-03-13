import styles from './TasksData.module.css'

export function TasksData({tasksList}) {
  const completedTasksCount = tasksList.filter(task => task.completed).length;

  return (
    <div className={styles.titleContainer}>
      <div className={styles.createdTasks}>
        <span>
          Tarefas criadas
        </span>

        <p>
          {tasksList.length}
        </p>
      </div>
      <div className={styles.completed}>
        <span>
          Concluídas
        </span>

        <p>
          {tasksList.length === 0 ? 0 : `${completedTasksCount} de ${tasksList.length}`}
        </p>
      </div>
    </div>
  )
}