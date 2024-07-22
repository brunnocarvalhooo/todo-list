import React from 'react'
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { InfoContainer, StyledTypographyData } from './styles'
import { useTask } from '../../../../shared/hooks/task'
import { TimePeriod, timePeriodOptions } from './util/FilterWithTimePeriod'
import { FaCircle, FaCheckCircle, FaRegCircle } from 'react-icons/fa'
import {
  allCategories,
  uncategorizedCategory,
} from '../../../../shared/utils/defaultCategories'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { Filters } from '../..'

type Props = {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

export function TasksData({ filters, setFilters }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openFilter = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { tasksList, categories } = useTask()

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const completedTasksCount = tasksList.filter((task) => task.completed).length

  const statusOptions = [
    {
      label: 'Complete',
      value: true,
      icon: (
        <FaCheckCircle
          color={theme.palette.secondary.main}
          style={{ marginRight: '10px' }}
        />
      ),
    },
    {
      label: 'Incomplete',
      value: false,
      icon: (
        <FaRegCircle
          color={theme.palette.primary.main}
          style={{ marginRight: '10px' }}
        />
      ),
    },
    { label: 'All', value: 'all', icon: undefined },
  ]

  return (
    <Box mb={mdDown ? 0 : 4}>
      <Box display="flex" justifyContent="space-between" gap={1.25}>
        <InfoContainer>
          <Typography
            fontWeight="bold"
            sx={{ color: theme.palette.primary.main }}
          >
            Tasks created
          </Typography>

          <StyledTypographyData>{tasksList.length}</StyledTypographyData>
        </InfoContainer>

        <Box display="flex" alignItems="center" gap={1}>
          <InfoContainer>
            <Typography
              fontWeight="bold"
              sx={{ color: theme.palette.secondary.main }}
            >
              Completed
            </Typography>

            <StyledTypographyData>
              {tasksList.length === 0
                ? 0
                : `${completedTasksCount} de ${tasksList.length}`}
            </StyledTypographyData>
          </InfoContainer>

          {!mdDown && (
            <Tooltip
              title={
                <Typography color={theme.palette.common.white}>
                  Filters
                </Typography>
              }
              placement="top-end"
            >
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={handleClick}
              >
                <FilterAltIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {mdDown && (
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Tooltip
            title={
              <Typography color={theme.palette.common.white}>
                Filters
              </Typography>
            }
            placement="left"
          >
            <IconButton
              aria-describedby={openFilter ? 'simple-popover' : undefined}
              onClick={handleClick}
            >
              <FilterAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <Popover
        id={openFilter ? 'simple-popover' : undefined}
        open={openFilter}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          m={1}
          gap={2}
          minWidth="150px"
        >
          <h4 style={{ color: theme.palette.secondary.main }}>Filters</h4>

          <FormControl fullWidth>
            <InputLabel color="secondary" id="demo-simple-select-label">
              Status
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              label="Status"
              color="secondary"
              variant="outlined"
              size="small"
              value={
                filters.status !== undefined ? filters.status.toString() : 'all'
              }
              onChange={(event: SelectChangeEvent<string>) => {
                const value = event.target.value
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  status: value === 'all' ? 'all' : value === 'true',
                }))
              }}
            >
              {statusOptions.map((statusOpt) => (
                <MenuItem
                  key={statusOpt.label}
                  value={statusOpt.value?.toString() || 'all'}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {statusOpt.icon}
                  {statusOpt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel color="secondary" id="demo-simple-select-label">
              Time
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              label="Time"
              variant="outlined"
              color="secondary"
              size="small"
              value={filters.time}
              onChange={(event: SelectChangeEvent<TimePeriod>) => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  time: event.target.value as TimePeriod,
                }))
              }}
            >
              {timePeriodOptions.map((tMO) => (
                <MenuItem key={tMO.value} value={tMO.value}>
                  {tMO.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel color="secondary" id="demo-simple-select-label">
              Category
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              label="Category"
              color="secondary"
              variant="outlined"
              size="small"
              value={filters.category.id}
              onChange={(event) => {
                const selectedCategoryId = event.target.value
                const selectedCategory =
                  selectedCategoryId === uncategorizedCategory.id
                    ? uncategorizedCategory
                    : selectedCategoryId === allCategories.id
                      ? allCategories
                      : categories.find((cat) => cat.id === selectedCategoryId)

                if (selectedCategory) {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    category: selectedCategory,
                  }))
                }
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  <FaCircle
                    color={category.color}
                    size={12}
                    style={{ marginRight: '10px' }}
                  />
                  {category.name}
                </MenuItem>
              ))}

              <MenuItem value={uncategorizedCategory.id}>
                <FaCircle
                  color="#919191"
                  size={12}
                  style={{ marginRight: '10px' }}
                />
                Uncategorized
              </MenuItem>

              <MenuItem value={allCategories.id}>
                <FaCircle
                  color="#919191"
                  size={12}
                  style={{ marginRight: '10px' }}
                />
                All categories
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Popover>
    </Box>
  )
}
