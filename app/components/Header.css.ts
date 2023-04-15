import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const headerStyle = style({
  background: vars.colors.white,
  height: 64,
  left: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  position: 'relative',
  right: '50%',
  width: '100vw'
})

export const headerInnerStyle = style({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'space-between',
  margin: '0 auto',
  padding: '0 32px',
  width: '100%',
  '@media': {
    '(min-width: 1024px)': {
      maxWidth: 896,
      padding: 0
    }
  }
})

export const headerTitleStyle = style({
  color: vars.colors.black,
  fontFamily: vars.fonts.nanum,
  fontSize: 24
})
