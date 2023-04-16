import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const recomendationsItemImageStyle = style({
  background: vars.colors.lightGrey04,
  height: 256
})

export const recomendationsItemTitleStyle = style({
  color: vars.colors.black,
  fontSize: 16,
  fontWeight: 500,
  marginTop: 8
})

export const recomendationsItemPricetyles = style({
  color: vars.colors.black,
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 8,
  marginTop: 8
})