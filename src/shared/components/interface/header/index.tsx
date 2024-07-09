import React, { useEffect, useState } from 'react'
import toDoLogoSVG from '../../../../assets/todo-list-logo.svg'

import { ContentWrapper, HeaderContainer } from './styles'
import {
  Box,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { StyledFab } from '../../../../shared/styles/components-styled/Fab'
import { capitalize } from '../../../../shared/utils/masks'
import { useScreen } from '../../../hooks/useScreen'

interface HeaderProps {
  activeScreen: string
  setActiveScreen: (newValue: string) => void
}

export function Header({ activeScreen, setActiveScreen }: HeaderProps) {
  const [hasBackground, setHasBackground] = useState(false)

  const { screens } = useScreen()

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const handleScroll = () => {
    const scrollTop = window.scrollY
    const scrollTrigger = 100
    setHasBackground(scrollTop > scrollTrigger)
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
        <img src={toDoLogoSVG} alt="" />

        <Box>
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
                  setActiveScreen(screen.name)
                  handleScrollToTop()
                }}
                color="primary"
                sx={{
                  transition: 'transform 0.1s ease',
                  color:
                    activeScreen === screen.name
                      ? theme.palette.primary.main
                      : theme.palette.grey[
                          theme.palette.mode === 'light' ? 500 : 100
                        ],
                  transform:
                    activeScreen === screen.name ? 'scale(1.25)' : undefined,

                  '&:hover': {
                    color:
                      activeScreen === screen.name
                        ? theme.palette.primary.main
                        : 'error',
                    transform:
                      activeScreen === screen.name ? undefined : 'scale(1.05)',
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
    </HeaderContainer>
  )
}
