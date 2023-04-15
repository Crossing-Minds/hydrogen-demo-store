import {globalStyle} from '@vanilla-extract/css'

import {vars} from './theme.css'

globalStyle('*', {
  fontFamily: vars.fonts.openSans
})
