import {createTheme} from '@vanilla-extract/css'

export const [themeClass, vars] = createTheme({
  colors: {
    black: '#000000',
    brandBlack: '#080E12',
    lightBlue01: '#F5F6FF',
    lightGrey04: '#D3D5E0',
    lightGrey05: '#B8BCD1',
    lightGrey07: '#626678',
    lightGrey08: '#373B4A',
    lightSurface100: '#F8F8FB',
    white: '#FFFFFF'
  },
  fonts: {
    nanum: 'Nanum Myeongjo',
    openSans: 'Open Sans'
  }
})
