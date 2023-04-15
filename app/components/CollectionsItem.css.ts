import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const collectionsItemImageStyle = style({
  background: vars.colors.lightGrey04,
  height: 256
})

export const collectionsItemTitleStyle = style({
  color: vars.colors.black,
  fontSize: 16,
  fontWeight: 500,
  marginTop: 16
})
