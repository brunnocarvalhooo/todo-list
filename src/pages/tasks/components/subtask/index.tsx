import React, { useCallback } from 'react'
import {
  Box,
  Checkbox,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Task, Subtask as SubtaskInterface } from '../../../../shared/dtos/Task'
import {
  deleteSubtask,
  getTaskById,
  getTasks,
  updateSubtasks,
} from '../../../../shared/services/tasks'
import { useTask } from '../../../../shared/hooks/task'

type Props = {
  subtask: SubtaskInterface
  task: Task

  isEditing: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>

  editedSubtasks: SubtaskInterface[]
  setEditedSubtasks: React.Dispatch<React.SetStateAction<SubtaskInterface[]>>
}

export function Subtask({
  subtask,
  task,
  isEditing,
  setIsExpanded,
  editedSubtasks,
  setEditedSubtasks,
}: Props) {
  const { setTasksList } = useTask()

  const onChangeInput = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      subtaskId: number,
    ) => {
      const newSubtaskValue = e.target.value
      setEditedSubtasks((prevEditedSubtasks) => {
        return prevEditedSubtasks.map((subtask) =>
          subtask.id === subtaskId
            ? { ...subtask, subtask: newSubtaskValue }
            : subtask,
        )
      })
    },
    [setEditedSubtasks],
  )

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const handleRemoveSubtask = useCallback(
    (subtaskId: number) => {
      if (isEditing) {
        setEditedSubtasks((prevSubtasks) =>
          prevSubtasks.filter((subtask) => subtask.id !== subtaskId),
        )

        return
      } else {
        deleteSubtask(task.id, subtaskId)

        setEditedSubtasks((prevSubtasks) =>
          prevSubtasks.filter((subtask) => subtask.id !== subtaskId),
        )
      }

      if (
        isEditing
          ? !isEditing && editedSubtasks.length === 1
          : !isEditing && task.subtasks?.length === 1
      ) {
        setIsExpanded(false)
      }

      const result = getTasks()

      setTasksList(result)
    },
    [
      editedSubtasks.length,
      isEditing,
      setEditedSubtasks,
      setIsExpanded,
      setTasksList,
      task.id,
      task.subtasks?.length,
    ],
  )

  const onChangeCompletedSubtask = useCallback(
    (subtaskId: number) => {
      try {
        const taskToUpdate = getTaskById(task.id)

        if (!taskToUpdate) {
          throw new Error(`Tarefa com ID ${task.id} não encontrada`)
        }

        const updatedSubtasks = (taskToUpdate.subtasks || []).map((subtask) => {
          if (subtask.id === subtaskId) {
            return { ...subtask, completed: !subtask.completed }
          }
          return subtask
        })

        updateSubtasks(task.id, updatedSubtasks)

        setEditedSubtasks((prevSubtasks) =>
          prevSubtasks.map((subtask) =>
            subtask.id === subtaskId
              ? { ...subtask, completed: !subtask.completed }
              : subtask,
          ),
        )

        const result = getTasks()

        setTasksList(result)
      } catch (error) {
        console.error('Erro ao completar subtarefa:', error)
        throw new Error(
          'Falha ao completar subtarefa. Por favor, tente novamente.',
        )
      }
    },
    [task.id, setEditedSubtasks, setTasksList],
  )

  return (
    <Box mb={2} display="flex" alignItems="flex-start" maxWidth="686px">
      <Box display="flex" alignItems="flex-start" flex={1}>
        <Checkbox
          checked={subtask.completed}
          sx={{ mr: 2 }}
          onChange={() => onChangeCompletedSubtask(subtask.id)}
        />

        {isEditing ? (
          <TextField
            value={
              editedSubtasks.find(
                (editedSubtaskItem) => editedSubtaskItem.id === subtask.id,
              )?.subtask
            }
            onChange={(e) => onChangeInput(e, subtask.id)}
            variant="standard"
            fullWidth
            multiline
            sx={{ maxWidth: mdDown ? '60vw' : '590px' }}
          />
        ) : (
          <Typography
            mt={1.2}
            sx={{
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              textDecoration: subtask.completed ? 'line-through' : '',
              color: subtask.completed
                ? theme.palette.grey[800]
                : theme.palette.grey[
                    theme.palette.mode === 'light' ? 900 : 100
                  ],
              maxWidth: mdDown ? '60vw' : '570px',
              minWidth: '100px',
            }}
          >
            {subtask.subtask}
          </Typography>
        )}
      </Box>

      <IconButton
        onClick={() => handleRemoveSubtask(subtask.id)}
        size="small"
        sx={{
          mt: 1,
          color: theme.palette.grey[theme.palette.mode === 'light' ? 700 : 600],

          '&:hover': {
            color: theme.palette.error.main,
            background: 'transparent',
          },
        }}
      >
        <FaRegTrashAlt size={16} />
      </IconButton>
    </Box>
  )
}
