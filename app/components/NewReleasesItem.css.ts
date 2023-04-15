import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const newReleasesItemStyle = style({
  background: vars.colors.lightGrey04,
  borderRadius: 4,
  display: 'flex',
  height: 256,
  justifyContent: 'center',
  position: 'relative',
  width: '100%'
})

export const newReleasesItemTitleStyle = style({
  background: vars.colors.white,
  bottom: 48,
  color: vars.colors.black,
  fontSize: 20,
  fontWeight: 500,
  padding: 8,
  position: 'absolute'
})
