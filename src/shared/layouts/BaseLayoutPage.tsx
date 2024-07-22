import {
  useTheme,
  Box,
  Typography,
  Tooltip,
  useMediaQuery,
} from '@mui/material'

import logo from '../../assets/todo-list-logo.svg'

import { StyledFab } from '../styles/components-styled/Fab'

import { Footer } from '../components'
import { useAppTheme } from '../hooks/theme'
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md'

interface IBaseLayoutPageProps {
  children: React.ReactNode
  headerContent: React.ReactNode
}

export const BaseLayoutPage: React.FC<IBaseLayoutPageProps> = ({
  children,
  headerContent,
}) => {
  const theme = useTheme()
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const { themeName, toggleTheme } = useAppTheme()

  return (
    <Box minHeight="100vh">
      <Box
        display="flex"
        alignItems="flex-start"
        gap={4}
        p={2}
        position="fixed"
        zIndex={mdDown ? 3 : 2}
        left={0}
        right={0}
        sx={{
          backgroundImage: lgDown
            ? '#003247'
            : `linear-gradient(to bottom, ${
                theme.palette.mode === 'light' ? '#c6edff' : '#001c27' // Adjust the dark mode gradient color
              }, rgba(0, 0, 255, 0))`,
          backdropFilter: 'blur(30px)',
        }}
      >
        <Box mr="auto">
          <img src={logo} alt="To-Do Logo" />
        </Box>

        <Box ml="auto">
          <Tooltip
            title={
              <Typography color={theme.palette.common.white}>
                Change theme
              </Typography>
            }
            placement="bottom-start"
          >
            <StyledFab
              onClick={toggleTheme}
              size="medium"
              color="primary"
              sx={{
                transition: 'transform 0.1s ease',
                color: theme.palette.primary.main,
                transform: 'scale(1.25)',

                '&:hover': {
                  color: theme.palette.primary.main,
                  background: `${theme.palette.primary.dark.replace(')', '')}, 0.2)`,
                },
              }}
            >
              {themeName === 'dark' ? (
                <MdDarkMode size={26} />
              ) : (
                <MdOutlineLightMode size={26} />
              )}
            </StyledFab>
          </Tooltip>
        </Box>
      </Box>

      <Box
        flexGrow={1}
        zIndex={lgDown ? 1 : 3}
        position="absolute"
        maxWidth={mdDown ? undefined : '766px'}
        left={0}
        right={0}
        top={lgDown ? 90 : 18}
        m="auto"
      >
        <Box px={2}>{headerContent}</Box>

        <Box
          minHeight="100vh"
          pt={2}
          px={2}
          overflow="hidden"
          m="auto"
          flex={1}
        >
          {children}
        </Box>

        <Footer />
      </Box>
    </Box>
  )
}
