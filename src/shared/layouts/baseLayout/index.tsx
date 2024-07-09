import React, {
  Box,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { ContentWrapper, HeaderContainer } from './styles'
import { StyledFab } from '../../styles/components-styled/Fab'
import { useScreen } from '../../hooks/useScreen'
import { capitalize } from '../../utils/masks'

import toDoLogoSVG from '../../../assets/todo-list-logo.svg'

type Props = {
  headerPageContent: ReactNode
  children: ReactNode
}

export const BaseLayout = ({ headerPageContent, children }: Props) => {
  const [hasBackground, setHasBackground] = useState(false)

  const { activeScreen, screens, setActiveScreen } = useScreen()

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'))

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const scrollTrigger = 100
    setHasBackground(scrollTop > scrollTrigger)
  }, [])

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <HeaderContainer
      sx={{
        background: mdDown
          ? 'transparent'
          : hasBackground
            ? `linear-gradient(to bottom, ${theme.palette.mode === 'light' ? '#e2f6ff' : '#00202e'}, rgba(0, 0, 255, 0))`
            : 'none',
        transition: 'background 5s ease-in-out',
      }}
    >
      <ContentWrapper>
        <Box>
          <img src={toDoLogoSVG} alt="To-Do Logo" />
        </Box>

        <Box ml="auto">
          {screens.map((screen) => (
            <Tooltip
              key={screen.name}
              title={
                <Typography color={theme.palette.common.white}>
                  {capitalize(screen.name)}
                </Typography>
              }
              placement="bottom"
            >
              <StyledFab
                size="large"
                onClick={() => {
                  setActiveScreen(screen)
                  handleScrollToTop()
                }}
                color="primary"
                sx={{
                  transition: 'transform 0.1s ease',
                  color:
                    activeScreen?.name === screen.name
                      ? theme.palette.primary.main
                      : theme.palette.grey[
                          theme.palette.mode === 'light' ? 500 : 100
                        ],
                  transform:
                    activeScreen?.name === screen.name
                      ? 'scale(1.25)'
                      : undefined,

                  '&:hover': {
                    color:
                      activeScreen?.name === screen.name
                        ? theme.palette.primary.main
                        : theme.palette.error.main,
                    transform:
                      activeScreen?.name === screen.name
                        ? undefined
                        : 'scale(1.05)',
                    background: `${theme.palette.primary.dark.replace(')', '')}, 0.2)`,
                  },
                }}
              >
                {screen.icon}
              </StyledFab>
            </Tooltip>
          ))}
        </Box>
      </ContentWrapper>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="absolute"
        top="0"
        left="0"
        right="0"
        pt={lgDown ? '110px' : '25px'}
      >
        <Box width={lgDown ? '90vw' : '766px'} flexGrow={1}>
          {headerPageContent}
        </Box>

        <Box width={lgDown ? '90vw' : '766px'}>{children}</Box>
      </Box>
    </HeaderContainer>
  )
}
