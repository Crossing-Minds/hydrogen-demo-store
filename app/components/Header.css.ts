import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const headerStyle = style({
  background: vars.colors.white,
  boxShadow: '0px 2px 18px rgba(1, 12, 122, 0.08)',
  height: 64,
  left: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  position: 'fixed',
  right: '50%',
  width: '100vw',
  zIndex: 10
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
