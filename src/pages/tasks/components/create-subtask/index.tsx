import React, { useCallback } from 'react'
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { Subtask } from '../../../../shared/dtos/Task'
import { SearchInput } from '../create-task/styles'
import { StyledDividerLink } from './styles'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useTask } from '../../../../shared/hooks/task'

type Props = {
  subtask: Subtask
  subtasksList: Subtask[]
}

export function CreateSubtask({ subtask, subtasksList }: Props) {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const { setSubtasks } = useTask()

  const handleRemoveSubtask = useCallback(
    (subtaskId: number) => {
      const updatedSubtasks = subtasksList
        .filter((subtask) => subtask.id !== subtaskId)
        .map((subtask, index) => ({ ...subtask, id: index + 1 }))

      setSubtasks(updatedSubtasks)
    },
    [subtasksList, setSubtasks],
  )

  const onChangeSubtaskInput = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      subtaskId: number,
    ) => {
      const updatedSubtasks = subtasksList.map((sub) =>
        sub.id === subtaskId ? { ...sub, subtask: e.target.value } : sub,
      )

      setSubtasks(updatedSubtasks)
    },
    [subtasksList, setSubtasks],
  )

  return (
    <Box key={subtask.id}>
      <StyledDividerLink
        orientation="vertical"
        sx={{
          border: '1px dashed',
          width: '1px',
          height: '30px',
          borderColor:
            theme.palette.grey[theme.palette.mode === 'light' ? 500 : 700],
        }}
      />

      <StyledDividerLink
        orientation="vertical"
        sx={{
          width: '1px',
          height: '30px',
        }}
      />

      <Box display="flex" alignItems="center">
        <StyledDividerLink
          orientation="horizontal"
          sx={{
            width: '20px',
            height: '1px',
          }}
        />

        <Box
          display="flex"
          alignItems="center"
          position="absolute"
          ml={5}
          width={mdDown ? '75vw' : '550px'}
        >
          <SearchInput
            name="subtask"
            value={subtask.subtask || ''}
            placeholder="Enter subtask here"
            onChange={(e) => onChangeSubtaskInput(e, subtask.id)}
          />

          <IconButton
            onClick={() => handleRemoveSubtask(subtask.id)}
            size="small"
            sx={{
              color:
                theme.palette.grey[theme.palette.mode === 'light' ? 700 : 700],

              '&:hover': {
                color: theme.palette.error.main,
                background: 'transparent',
              },
            }}
          >
            <FaRegTrashAlt size={16} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
