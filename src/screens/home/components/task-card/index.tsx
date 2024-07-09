import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { StyledTaskAccordion } from './styles'
import { StyledFab } from '../../../../shared/styles/components-styled/Fab'
import {
  FaCheckCircle,
  FaCircle,
  FaRegCircle,
  FaRegTrashAlt,
} from 'react-icons/fa'
import { Subtask as SubtaskInterface, Task } from '../../../../shared/dtos/Task'

import {
  deleteTask,
  getCategoryByTaskId,
  getTasks,
  updateSubtasks,
  updateTask,
  updateTaskCategory,
} from '../../../../shared/services'
import { BiSolidEdit } from 'react-icons/bi'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { format } from 'date-fns'
import { MdAddLink, MdClose } from 'react-icons/md'
import { Category } from '../../../../shared/dtos'
import { uncategorizedCategory } from '../../../../shared/utils/defaultCategories'
import { CategorieChip } from '../categorie-chip'
import { Subtask } from '../subtask'
import { useTask } from '../../../../shared/hooks/useTask'
import { Filters } from '../../..'

interface TaskCardProps {
  task: Task
  fetchTasks: () => Promise<void>
  filters: Filters
}

export function TaskCard({ task, fetchTasks, filters }: TaskCardProps) {
  const [inpuTaskEdit, setInpuTaskEdit] = useState(task.task || '')
  const [isEditing, setIsEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [inpuTaskEditError, setInpuTaskEditError] = useState<string | null>(
    null,
  )
  const [editedSubtasks, setEditedSubtasks] = useState<SubtaskInterface[]>(
    task.subtasks || [],
  )
  const [taskCategory, setTaskCategory] = useState<Category | null>(null)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const { tasksList, categories } = useTask()

  const contentRef = useRef<HTMLDivElement>(null)

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const typographyRef = useRef<HTMLDivElement>(null)

  const fetchTaskCategory = useCallback(() => {
    try {
      const result = getCategoryByTaskId(task.id)

      setTaskCategory(result)
    } catch (error) {
      console.log(error)
    }
  }, [task.id])

  const handleChangeIsEditing = useCallback(
    (task: Task) => {
      setIsEditing(!isEditing)

      const cleanSubtasks = (subtasks: SubtaskInterface[] | undefined) => {
        if (!subtasks) return []
        return subtasks.filter((subtask) => subtask.subtask.trim() !== '')
      }

      const cleanedSubtasks = cleanSubtasks(task.subtasks)

      if (cleanedSubtasks.length !== task.subtasks?.length) {
        updateSubtasks(task.id, cleanedSubtasks)

        fetchTasks()
      }

      if (isExpanded) {
        if (isEditing) {
          setIsExpanded(cleanedSubtasks.length > 0)
        } else {
          setIsExpanded(true)
        }
      } else {
        setIsExpanded(true)
      }
    },
    [fetchTasks, isEditing, isExpanded],
  )

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)

    if (!isEditing) {
      fetchTaskCategory()
    }
  }

  const handleUpdateTask = useCallback(async () => {
    if (inpuTaskEdit === '') {
      setInpuTaskEditError('Required field')
      return
    }

    const updatedTask = {
      ...task,
      task: inpuTaskEdit,
      subtasks: editedSubtasks.filter(
        (subtask) => subtask.subtask.trim() !== '',
      ),
    }

    updateTask(updatedTask)

    const prevTaskCategory = getCategoryByTaskId(task.id)

    if (prevTaskCategory?.id !== taskCategory?.id) {
      updateTaskCategory(
        task.id,
        taskCategory === uncategorizedCategory ? undefined : taskCategory?.id,
      )
    }

    await fetchTasks()

    const updatedTasks = getTasks(
      filters.time,
      filters.category,
      filters.status !== 'all' ? filters.status : undefined,
    )

    const updatedTaskItem = updatedTasks.find(
      (taskItem) => taskItem.id === task.id,
    )

    if (
      updatedTaskItem !== undefined &&
      updatedTaskItem.subtasks &&
      updatedTaskItem.subtasks.length > 0
    ) {
      setIsExpanded(true)
    } else {
      setIsExpanded(false)
    }

    setIsEditing(false)
  }, [
    editedSubtasks,
    fetchTasks,
    filters.category,
    filters.status,
    filters.time,
    inpuTaskEdit,
    task,
    taskCategory,
  ])

  function handleExpandClick(event: React.MouseEvent) {
    event.stopPropagation()
    setIsExpanded((prevExpanded) => !prevExpanded)
  }

  function handleDeleteTask(taskId: string) {
    try {
      deleteTask(taskId)

      fetchTasks()
    } catch (error) {
      console.error('Failed to delete task:', error.message)
    }
  }

  const handleCompleteTask = useCallback(
    (id: string) => {
      if (!tasksList) return

      const updatedTask = tasksList.find((taskItem) => taskItem.id === id)

      if (!updatedTask) {
        console.error('Task not found')
        return
      }

      const updatedTaskData = {
        ...updatedTask,
        subtasks: updatedTask.subtasks || [],
        completed: !updatedTask.completed,
      }

      try {
        updateTask(updatedTaskData)

        fetchTasks()
      } catch (error) {
        console.error('Failed to update task:', error.message)
      }
    },
    [fetchTasks, tasksList],
  )

  const handleCreateSubtask = useCallback(() => {
    try {
      const newSubtask: SubtaskInterface = {
        id: editedSubtasks.length + 1,
        subtask: '',
        completed: false,
      }

      setEditedSubtasks([...editedSubtasks, newSubtask])
    } catch (err) {
      console.error('Error creating subtask:', err)
    }
  }, [editedSubtasks])

  useEffect(() => {
    fetchTaskCategory()
  }, [fetchTaskCategory, task.id, isEditing, categories])

  return (
    <StyledTaskAccordion key={task.id} expanded={isExpanded} elevation={0}>
      <AccordionSummary>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          gap={1}
          flex={1}
        >
          <IconButton
            onClick={() => handleCompleteTask(task.id)}
            sx={{ mr: 1 }}
          >
            {task.completed ? (
              <FaCheckCircle size={20} color={theme.palette.secondary.dark} />
            ) : (
              <FaRegCircle size={20} color={theme.palette.primary.dark} />
            )}
          </IconButton>

          <Box display="flex" flexDirection="column" flex={1}>
            {isEditing ? (
              <TextField
                onChange={(e) => {
                  setInpuTaskEdit(e.target.value)
                  inpuTaskEditError !== '' && setInpuTaskEditError('')
                }}
                variant="standard"
                value={inpuTaskEdit}
                fullWidth
                multiline
                helperText={inpuTaskEditError}
                error={!!inpuTaskEditError}
              />
            ) : (
              <h4
                ref={typographyRef}
                className="task-title"
                style={{
                  textDecoration: task.completed ? 'line-through' : '',
                  color: task.completed
                    ? theme.palette.grey[700]
                    : theme.palette.grey[
                        theme.palette.mode === 'dark' ? 100 : 900
                      ],
                }}
              >
                {task.task}
              </h4>
            )}

            <Box display="flex" alignItems="center" mt="6px">
              {!isEditing && (
                <CategorieChip
                  categorie={taskCategory || uncategorizedCategory}
                  sx={{ height: '16px', fontSize: '0.75rem', mr: '8px' }}
                />
              )}

              <span
                style={{
                  color: theme.palette.grey[300],
                  fontWeight: 'normal',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                }}
              >
                {format(task.created_at, 'HH:mm')}
              </span>
            </Box>
          </Box>

          <Box display="flex" ml={1} flexDirection={mdDown ? 'column' : 'row'}>
            <IconButton
              onClick={() => handleDeleteTask(task.id)}
              size="small"
              sx={{
                ml: 1,
                color:
                  theme.palette.grey[theme.palette.mode === 'dark' ? 600 : 700],

                '&:hover': {
                  color: theme.palette.error.main,
                  background: 'transparent',
                },
              }}
            >
              <FaRegTrashAlt size={16} />
            </IconButton>

            <IconButton
              onClick={() => {
                handleChangeIsEditing(task)
                setEditedSubtasks(task.subtasks || [])
              }}
              sx={{
                ml: 1,
                color:
                  theme.palette.grey[theme.palette.mode === 'dark' ? 600 : 700],

                '&:hover': {
                  color: theme.palette.primary.dark,
                  background: 'transparent',
                },
              }}
            >
              {isEditing ? <MdClose size={20} /> : <BiSolidEdit size={20} />}
            </IconButton>

            {task.subtasks && task.subtasks.length > 0 && (
              <IconButton
                onClick={handleExpandClick}
                size="small"
                sx={{
                  ml: mdDown ? 1 : 0.5,
                  mr: mdDown ? 0 : 0.5,
                  color:
                    theme.palette.grey[
                      theme.palette.mode === 'dark' ? 600 : 700
                    ],

                  '&:hover': {
                    color: theme.palette.primary.dark,
                    background: 'transparent',
                  },
                }}
              >
                {isExpanded ? (
                  <IoIosArrowUp size={20} />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </IconButton>
            )}
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        {isExpanded && (
          <Box ref={contentRef}>
            {task.subtasks && task.subtasks.length > 0 && (
              <p
                style={{
                  color:
                    theme.palette.grey[
                      theme.palette.mode === 'dark' ? 300 : 700
                    ],
                  marginLeft: '8px',
                  marginBottom: '16px',
                }}
              >
                Subtasks
              </p>
            )}

            <Box ml={1} width={mdDown ? '81vw' : '720px'}>
              {editedSubtasks &&
                editedSubtasks.map((subtask) => (
                  <Subtask
                    key={subtask.id}
                    subtask={subtask}
                    task={task}
                    isEditing={isEditing}
                    setIsExpanded={setIsExpanded}
                    editedSubtasks={editedSubtasks}
                    setEditedSubtasks={setEditedSubtasks}
                  />
                ))}
            </Box>
          </Box>
        )}

        {isEditing && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            mt={task.subtasks && task.subtasks.length > 0 ? 4 : 0}
            mr={1}
            mb={1}
            gap={2}
          >
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              sx={{
                '& .css-6hp17o-MuiList-root-MuiMenu-list': {
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              }}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  onClick={() => {
                    handleClose()
                    setTaskCategory(category)
                  }}
                  sx={{ padding: '8px 16px' }}
                >
                  <FaCircle
                    color={category.color}
                    size={12}
                    style={{ marginRight: '10px' }}
                  />
                  {category.name}
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => {
                  handleClose()
                  setTaskCategory(uncategorizedCategory)
                }}
                sx={{ padding: '8px 16px' }}
              >
                <FaCircle
                  color="#919191"
                  size={12}
                  style={{ marginRight: '10px' }}
                />
                Uncategorized
              </MenuItem>
            </Menu>

            <CategorieChip
              onClick={handleClick}
              categorie={taskCategory || uncategorizedCategory}
            />

            <Tooltip
              title={
                <Typography color={theme.palette.common.white}>
                  Add subtask
                </Typography>
              }
              placement="top"
            >
              <StyledFab
                onClick={handleCreateSubtask}
                size="small"
                sx={{
                  '&:hover': {
                    background: 'transparent',
                  },
                }}
              >
                <MdAddLink size={22} />
              </StyledFab>
            </Tooltip>
            <Button onClick={handleUpdateTask}>
              <Typography
                color={theme.palette.primary.main}
                textTransform="capitalize"
                fontWeight="bold"
              >
                Salvar
              </Typography>
            </Button>
          </Box>
        )}
      </AccordionDetails>
    </StyledTaskAccordion>
  )
}
