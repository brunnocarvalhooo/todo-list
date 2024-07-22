import React, { useState, useCallback, useRef } from 'react'
import { GoPlus } from 'react-icons/go'

import { Form } from '@unform/web'

import { FormHandles } from '@unform/core'
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { CreateTaskButton, SearchInput } from './styles'
import * as Yup from 'yup'
import { MdAddLink } from 'react-icons/md'
import { Subtask } from '../../../../shared/dtos/Task'
import { CreateSubtask } from '../create-subtask'
import { createTask } from '../../../../shared/services'

import { v4 as uuid } from 'uuid'
import { CategorieChip } from '../categorie-chip'
import { FaCircle } from 'react-icons/fa'
import { GrConfigure } from 'react-icons/gr'
import { ModalManageCategories } from './modal-ManageCategories'
import { truncateText } from '../../../../shared/utils/masks'
import { Category } from '../../../../shared/dtos'
import { uncategorizedCategory } from '../../../../shared/utils/defaultCategories'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import getValidationErrors from '../../../../shared/utils/getValidationErrors'
import { useTask } from '../../../../shared/hooks/task'

const schema = Yup.object().shape({
  task: Yup.string().required('Required field'),
})

type Props = {
  fetchTasks: () => Promise<void>
}

export function CreateTask({ fetchTasks }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [openModalManageCatetegories, setOpenModalManageCategories] =
    useState(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const { categories, subtasks, setSubtasks } = useTask()

  const formRef = useRef<FormHandles>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCreateSubtask = () => {
    const newSubtask: Subtask = {
      id: subtasks.length > 0 ? subtasks[subtasks.length - 1].id + 1 : 1,
      subtask: '',
      completed: false,
    }

    setSubtasks([...subtasks, newSubtask])
  }

  const handleCreateTask = useCallback(
    async (data: { task: string }) => {
      try {
        setIsLoading(true)

        const validSubtasks = subtasks
          .filter((subtask) => subtask.subtask.trim() !== '')
          .map((subtask, index) => ({ ...subtask, id: index + 1 }))

        const taskData = {
          id: uuid(),
          task: data.task,
          subtasks: validSubtasks,
          completed: false,
          created_at: new Date().toISOString(),
        }

        await schema.validate(taskData, { abortEarly: false })

        createTask(taskData, selectedCategory && selectedCategory.id)

        fetchTasks()

        formRef.current?.setFieldValue('task', '')
        setSubtasks([])
        setSelectedCategory(undefined)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          return formRef.current?.setErrors(errors)
        }

        console.log(err)
      } finally {
        setIsLoading(false)
      }
    },
    [subtasks, selectedCategory, fetchTasks, setSubtasks],
  )

  return (
    <Box>
      <Form
        ref={formRef}
        onSubmit={handleCreateTask}
        placeholder="Crie sua task"
      >
        <Box display="flex" justifyContent="center">
          <SearchInput name="task" type="text" placeholder="Add a new task" />

          <CreateTaskButton
            disabled={isLoading}
            variant="contained"
            type="submit"
            disableElevation
          >
            {mdDown ? undefined : 'Create'}

            {mdDown ? <AiOutlinePlusCircle size={32} /> : <GoPlus size={22} />}
          </CreateTaskButton>
        </Box>

        <Box mt={mdDown ? 1 : 1} ml={1} display="flex">
          <Tooltip
            title={
              <Typography color={theme.palette.common.white}>
                Add subtask
              </Typography>
            }
            placement="bottom-start"
          >
            <IconButton onClick={handleCreateSubtask}>
              <MdAddLink
                size={22}
                color={
                  theme.palette.grey[theme.palette.mode === 'light' ? 700 : 100]
                }
              />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            sx={{
              '& .css-6hp17o-MuiList-root-MuiMenu-list': {
                paddingTop: 0,
                paddingBottom: 0,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                setSelectedCategory(undefined)
                handleClose()
              }}
              sx={{ padding: '8px 16px' }}
            >
              <FaCircle
                color="#656565"
                size={12}
                style={{ marginRight: '10px' }}
              />
              Uncategorized
            </MenuItem>
            {categories &&
              categories.map((categorie) => (
                <MenuItem
                  key={categorie.id}
                  onClick={() => {
                    handleClose()
                    setSelectedCategory(categorie)
                  }}
                  sx={{ padding: '8px 16px' }}
                >
                  <FaCircle
                    color={categorie.color}
                    size={12}
                    style={{ marginRight: '10px' }}
                  />
                  {truncateText(categorie.name, 26)}
                </MenuItem>
              ))}
            <MenuItem
              onClick={() => setOpenModalManageCategories(true)}
              sx={{ padding: '8px 16px', mt: 2 }}
            >
              Manage Categories
              <GrConfigure size={16} style={{ marginLeft: '10px' }} />
            </MenuItem>
          </Menu>

          <ModalManageCategories
            open={openModalManageCatetegories}
            setOpen={setOpenModalManageCategories}
          />

          <CategorieChip
            sx={{ mt: 1, ml: 1 }}
            categorie={selectedCategory || uncategorizedCategory}
            onClick={handleClick}
          />
        </Box>

        {subtasks.length > 0 && (
          <Box ml={0.9} mb={8}>
            {subtasks.map((subtask) => (
              <CreateSubtask
                key={subtask.id}
                subtask={subtask}
                subtasksList={subtasks}
              />
            ))}
          </Box>
        )}
      </Form>
    </Box>
  )
}
