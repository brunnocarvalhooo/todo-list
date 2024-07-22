import { useCallback, useEffect, useState } from 'react'
import {
  ListContainer,
  RollUpFab,
  TasksContainer,
  slideInUp,
  slideOutDown,
} from './styles'
import { CreateTask, TaskCard, TasksData } from './components/index'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { LuClipboardList } from 'react-icons/lu'
import { getTasks } from '../../shared/services'
import { useTask } from '../../shared/hooks/task'
import { format, parseISO } from 'date-fns'
import { Category, Task } from '../../shared/dtos'
import { TimePeriod } from './components/tasks-data/util/FilterWithTimePeriod'
import {
  allCategories,
  uncategorizedCategory,
} from '../../shared/utils/defaultCategories'
import { IoIosArrowRoundUp } from 'react-icons/io'
import { BaseLayoutPage } from '../../shared/layouts/BaseLayoutPage'

interface GroupedTasks {
  [date: string]: Task[]
}

export interface Filters {
  time: TimePeriod
  category: Category
  status: boolean | 'all'
}

export function Tasks() {
  const [filters, setFilters] = useState<Filters>({
    time: TimePeriod.AllTime,
    category: allCategories,
    status: 'all',
  })
  const [isVisible, setIsVisible] = useState(false)

  const { tasksList, setTasksList } = useTask()

  const theme = useTheme()
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'))

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const scrollTrigger = 100
    setIsVisible(scrollTop > scrollTrigger)
  }, [])

  const fetchTasks = useCallback(async () => {
    try {
      const status: boolean | undefined =
        filters.status !== 'all' ? filters.status : undefined

      const category: Category | undefined =
        filters.category.id === allCategories.id
          ? undefined
          : filters.category.id === uncategorizedCategory.id
            ? { ...uncategorizedCategory, id: '' }
            : filters.category

      const result = getTasks(filters.time, category, status)

      setTasksList(result)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }, [filters.category, filters.status, filters.time, setTasksList])

  const groupTasksByDate = (tasks: Task[]): GroupedTasks => {
    return tasks.reduce((groupedTasks, task) => {
      const date = format(parseISO(task.created_at), 'yyyy-MM-dd')
      if (!groupedTasks[date]) {
        groupedTasks[date] = []
      }
      groupedTasks[date].push(task)
      return groupedTasks
    }, {} as GroupedTasks)
  }

  const groupedTasks = groupTasksByDate(tasksList || [])

  const getDateFormat = (timePeriod: TimePeriod): string => {
    switch (timePeriod) {
      case TimePeriod.Today:
        return "'Today'"
      case TimePeriod.OneWeek:
        return 'iiii'
      case TimePeriod.OneMonth:
        return 'MMMM dd'
      case TimePeriod.ThreeMonths:
        return 'MMMM dd, yyyy'
      case TimePeriod.SixMonths:
        return 'MMMM dd, yyyy'
      case TimePeriod.OneYear:
        return 'MMMM dd, yyyy'
      case TimePeriod.AllTime:
        return 'MMMM dd, yyyy'
      default:
        return 'MMMM dd, yyyy'
    }
  }
  const dateFormat = getDateFormat(filters.time)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    document.title = 'Tasks - ToDo'
  }, [])

  return (
    <BaseLayoutPage headerContent={<CreateTask fetchTasks={fetchTasks} />}>
      <TasksContainer>
        <TasksData filters={filters} setFilters={setFilters} />

        {tasksList?.length === 0 ? (
          <ListContainer>
            <LuClipboardList size={88} color={theme.palette.grey[600]} />

            <Typography variant="h4" fontWeight="bold">
              No tasks found
            </Typography>

            <Typography>Create tasks and organize your to-do items</Typography>
          </ListContainer>
        ) : (
          <Box mb="50px">
            {Object.entries(groupedTasks).map(([date, tasks]) => (
              <Box key={date} mb={4}>
                <Typography variant="body1" fontWeight="bold">
                  {filters.time === TimePeriod.Today
                    ? undefined
                    : format(parseISO(date), dateFormat)}
                </Typography>
                <Box mt={2}>
                  {tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      fetchTasks={fetchTasks}
                      filters={filters}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </TasksContainer>

      {isVisible && (
        <Box
          position="fixed"
          zIndex={2}
          bottom={xlUp ? '50px' : '3vw'}
          right={xlUp ? '50px' : '3vw'}
        >
          <RollUpFab
            onClick={handleScrollToTop}
            sx={{
              animation: isVisible
                ? `${slideInUp} 0.2s ease`
                : `${slideOutDown} 0.2s ease`,
            }}
          >
            <IoIosArrowRoundUp size={36} />
          </RollUpFab>
        </Box>
      )}
    </BaseLayoutPage>
  )
}
