import { GoPlus } from "react-icons/go";

import styles from './CreateTask.module.css'

export function CreateTask({ handleCreateTask, task, ChangeSetValue }) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleCreateTask();
    }}>
      <aside className={styles.search}>
        <input type="text" value={task} placeholder="Adicione uma nova tarefa" onChange={(e) => ChangeSetValue(e.target.value)} />
        <button type="submit">
          Criar
          <GoPlus size={22} />
        </button>
      </aside>
    </form>
  )
}