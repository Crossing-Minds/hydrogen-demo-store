import {globalStyle} from '@vanilla-extract/css'

import {vars} from './theme.css'

globalStyle('*', {
  fontFamily: vars.fonts.openSans
})

globalStyle(':root', {
  vars: {
    '--swiper-navigation-size': '14px'
  }
})

globalStyle('body', {
  overflow: 'initial'
})

globalStyle('.swiper-button-next, .swiper-button-prev', {
  background: vars.colors.white,
  borderRadius: '50%',
  boxShadow: '0px 4px 24px rgba(1, 12, 122, 0.14)',
  color: vars.colors.black,
  height: 32,
  width: 32
})
