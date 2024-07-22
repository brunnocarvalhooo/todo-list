import React, { useCallback, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { useTask } from '../../../../shared/hooks/task'
import { FaCircle, FaRegTrashAlt } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { StyledFab } from '../../../../shared/styles/components-styled/Fab'
import { BiSolidEdit } from 'react-icons/bi'
import { Category } from '../../../../shared/dtos/Category'
import {
  createCategory,
  deleteCategory,
  getCategories,
  resetDefaultCategories,
  updateCategory,
} from '../../../../shared/services'
import { v4 as uuid } from 'uuid'
import { ColorPicker } from '../../../../shared/components'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

type Props = {
  open: boolean
  setOpen: (newValue: boolean) => void
}

interface IFormCategory {
  id?: string
  title: string
}

export function ModalManageCategories({ open, setOpen }: Props) {
  const [formCategory, setFormCategory] = useState<IFormCategory>({
    id: undefined,
    title: '',
  })
  const [categoryColor, setCategoryColor] = useState('#fff')
  const [isEditing, setIsEditing] = useState(false)
  const [titleCategoryError, setTitleCategoryError] = useState('')

  const { categories, setCategories } = useTask()

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const handleColorChange = (newColor: string) => {
    setCategoryColor(newColor)
  }

  const handleClose = () => {
    setOpen(false)
    setIsEditing(false)
    setTitleCategoryError('')

    setCategoryColor('#fff')
    setFormCategory({
      title: '',
    })
  }

  const handleRemoveCategory = useCallback(
    (categoryId: string) => {
      deleteCategory(categoryId)

      const result = getCategories()

      setCategories(result)

      setIsEditing(false)

      setCategoryColor('#fff')
      setFormCategory({
        id: undefined,
        title: '',
      })
    },
    [setCategories],
  )

  function handleChangeEditMode(category?: Category) {
    setTitleCategoryError('')

    if (isEditing) {
      if (category) {
        setIsEditing(true)
      } else {
        setIsEditing(false)
      }
    } else {
      setIsEditing(true)
    }

    setFormCategory({
      id: category?.id,
      title: category ? category.name : '',
    })

    setCategoryColor(category ? category.color : '#fff')
  }

  function handleResetCategories() {
    resetDefaultCategories()

    const result = getCategories()

    setCategories(result)
  }

  async function handleCreateCategory() {
    if (formCategory.title === '') {
      setTitleCategoryError('Required field')
      return
    }

    const newCategory: Category = {
      id: uuid(),
      name: formCategory.title,
      color: categoryColor,
    }

    createCategory(newCategory)

    const result = getCategories()

    setCategories(result)

    setCategoryColor('#fff')
    setFormCategory({
      id: undefined,
      title: '',
    })
  }

  function handleUpdateCategory() {
    const updatedCategpry: Category = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: formCategory.id!,
      name: formCategory.title,
      color: categoryColor,
    }

    updateCategory(updatedCategpry)

    const result = getCategories()

    setCategories(result)

    setIsEditing(false)

    setCategoryColor('#fff')
    setFormCategory({
      id: undefined,
      title: '',
    })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullWidth
      fullScreen={smDown}
    >
      <DialogTitle
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight="bold" fontSize="1.7rem">
          Manage Categories
        </Typography>

        <StyledFab
          onClick={handleClose}
          size="small"
          sx={{
            color:
              theme.palette.grey[theme.palette.mode === 'dark' ? 300 : 600],
            mt: 0.3,

            '&:hover': {
              color: theme.palette.error.main,
              background: 'transparent',
            },
          }}
        >
          <IoMdClose size={26} />
        </StyledFab>
      </DialogTitle>

      <DialogContent>
        {categories.length === 0 ? (
          <Box
            height="300px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={1}
            paddingX={6}
          >
            <Typography textAlign="center" variant="h4" fontWeight="bold">
              No category found
            </Typography>

            <Typography
              style={{
                fontSize: '0.8rem',
                textAlign: 'center',
                color:
                  theme.palette.grey[theme.palette.mode === 'dark' ? 300 : 500],
              }}
            >
              Create a new category or reset the list with the default
              categories
              <br />
              <Button
                variant="text"
                size="small"
                color="primary"
                onClick={handleResetCategories}
                sx={{
                  mt: 1,
                  padding: '2px 5px',
                  minHeight: 0,
                  minWidth: 0,
                  textTransform: 'none',
                }}
              >
                reset categories
              </Button>
            </Typography>
          </Box>
        ) : (
          <>
            {categories.map((category) => (
              <Card
                elevation={0}
                key={category.id}
                sx={{
                  bgcolor:
                    theme.palette.grey[
                      theme.palette.mode === 'dark' ? 900 : 200
                    ],
                  my: 2,
                  '&:hover': {
                    transform: 'scale(1.01)',
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="flex-start">
                    <Box display="flex" alignItems="flex-start" gap={2} mt={1}>
                      <Box display="flex" mt={0.2}>
                        <FaCircle color={category.color} />
                      </Box>

                      <h4
                        style={{
                          overflowWrap: 'break-word',
                          wordBreak: 'break-word',
                        }}
                      >
                        {category.name}
                      </h4>
                    </Box>

                    <Box display="flex" ml="auto">
                      <StyledFab
                        onClick={() => handleChangeEditMode(category)}
                        size="small"
                        sx={{
                          color:
                            theme.palette.grey[
                              theme.palette.mode === 'dark' ? 300 : 600
                            ],

                          '&:hover': {
                            color: theme.palette.primary.dark,
                            background: 'transparent',
                          },
                        }}
                      >
                        <BiSolidEdit size={22} />
                      </StyledFab>

                      <StyledFab
                        onClick={() => handleRemoveCategory(category.id)}
                        size="small"
                        sx={{
                          color:
                            theme.palette.grey[
                              theme.palette.mode === 'dark' ? 300 : 600
                            ],

                          '&:hover': {
                            color: theme.palette.error.main,
                            background: 'transparent',
                          },
                        }}
                      >
                        <FaRegTrashAlt size={16} />
                      </StyledFab>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </DialogContent>

      <Box ml={2.5} mt={2} mb={isEditing ? 0 : 0.8}>
        <h4 style={{ display: 'flex' }}>
          {isEditing ? 'Edit' : 'Create'} category
          {isEditing && (
            <Box
              onClick={() => handleChangeEditMode()}
              sx={{
                color:
                  theme.palette.grey[theme.palette.mode === 'dark' ? 300 : 600],
                ml: 1,
                cursor: 'pointer',

                '&:hover': {
                  color: theme.palette.error.main,
                  background: 'transparent',
                },
              }}
            >
              <IoMdClose size={20} />
            </Box>
          )}
        </h4>
      </Box>

      <DialogActions
        sx={{
          bgcolor:
            theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 300],
          padding: 2,
          margin: 2,
          borderRadius: 2,

          '&:hover': {
            transform: 'scale(1.01)',
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" alignItems="center">
            <Box display="flex" alignItems="center" id="basic-button" mr={2}>
              <FaCircle color={categoryColor} size={20} />
            </Box>

            <TextField
              onChange={(e) => {
                setFormCategory((prevFormCategory) => ({
                  ...prevFormCategory,
                  title: e.target.value,
                }))
                titleCategoryError !== '' && setTitleCategoryError('')
              }}
              value={formCategory.title}
              fullWidth
              variant="standard"
              placeholder="Title"
              helperText={titleCategoryError}
              error={!!titleCategoryError}
            />
          </Grid>

          <Grid item xs={8} md={9} mb={2} mt={4}>
            <ColorPicker
              initialColor={categoryColor}
              onChangeColorPicker={handleColorChange}
              styles={{
                default: {
                  picker: {
                    width: '98%',
                    marginLeft: 10,
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={4} md={3} mt={2}>
            <Button
              onClick={() =>
                isEditing ? handleUpdateCategory() : handleCreateCategory()
              }
              fullWidth
              sx={{
                p: '5px 10px',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                fontSize: '1.15rem',
              }}
            >
              {isEditing ? 'Save' : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}
