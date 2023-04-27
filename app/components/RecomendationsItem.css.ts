import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const recomendationsItemImageStyle = style({
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: 256
})

export const recomendationsItemTitleStyle = style({
  color: vars.colors.black,
  display: 'block',
  fontSize: 16,
  fontWeight: 500,
  marginTop: 8,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})

export const recomendationsItemPricetyles = style({
  color: vars.colors.black,
  display: 'block',
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 8,
  marginTop: 8,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})

export const recomendationsItemAddToCartButtonStyles = style({
  minWidth: 120
})
