import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const HeaderCartStyle = style({
  background: 'none',
  border: 0,
  cursor: 'pointer',
  position: 'relative'
})

export const HeaderCartQuantityStyle = style({
  background: vars.colors.black,
  borderRadius: '50%',
  bottom: -5,
  color: vars.colors.white,
  fontSize: 11,
  fontWeight: 600,
  height: 14,
  lineHeight: '14px',
  position: 'absolute',
  right: 0,
  textAlign: 'center',
  width: 14
})
