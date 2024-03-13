import { useState } from "react"

import { Header, CreateTask, Task, TasksData } from "./components"
import styles from './App.module.css'

import './global.css'

export function App() {
  const [task, setTask] = useState('');
  const [tasksList, setTasksList] = useState([]);

  function ChangeSetValue(newValue) {
    setTask(newValue)
  }

  function handleCreateTask() {
    if (task.trim() !== '') {
      setTask('')
      setTasksList([...tasksList, {
        id: tasksList.length + 1,
        task,
        completed: false
      }]);
    }
  }

  function handleDeleteTask(taskId) {
    const updatedTasks = tasksList.filter(task => task.id !== taskId);
    setTasksList(updatedTasks);
  }

  function handleCompleteTask(index) {
    const updatedTasks = tasksList.map((taskItem, idx) => {
      if (idx === index) {
        return {
          ...taskItem,
          completed: !taskItem.completed
        };
      }
      return taskItem;
    });
    setTasksList(updatedTasks);
  }

  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.contentContainer}>
        <CreateTask ChangeSetValue={ChangeSetValue} handleCreateTask={handleCreateTask} task={task} />

        <main className={styles.main}>
          <TasksData tasksList={tasksList} />

          <Task handleCompleteTask={handleCompleteTask} tasksList={tasksList} handleDeleteTask={handleDeleteTask} />
        </main>
      </div>
    </div>
  );
}
