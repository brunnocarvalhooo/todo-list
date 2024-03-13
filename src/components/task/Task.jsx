import { LuClipboardList } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

import check from '../../assets/check.svg'
import unCheck from '../../assets/uncheck.svg'

import styles from './Task.module.css'

export function Task({ tasksList, handleCompleteTask, handleDeleteTask }) {
  return (
    <>
      {tasksList.length === 0 ? (
        <div className={styles.listContainer}>
          <LuClipboardList size={50} />
          <h4>
            Você ainda não tem tarefas cadastradas
          </h4>
          <span>
            Crie tarefas e organize seus itens a fazer
          </span>
        </div>
      ) : (
        <>
          {tasksList.map(({ id, task, completed }, index) => (
            <div key={id} className={styles.task}>
              <div className={styles.taskTitle}>
                <button onClick={() => handleCompleteTask(index)}>
                  <img src={completed ? check : unCheck} />
                </button>

                <p
                  style={{
                    maxWidth: window.innerWidth < 900 ? '50vw' : '600px',
                    overflowWrap: 'break-word',
                    textDecoration: completed ? 'line-through' : '',
                    color: completed ? 'var(--gray-300)' : 'var(--gray-100)',
                  }}
                >
                  {task}
                </p>
              </div>
              <button onClick={() => handleDeleteTask(id)}>
                <FaRegTrashAlt size={16} />
              </button>
            </div>
          ))}
        </>
      )}
    </>

  )
}