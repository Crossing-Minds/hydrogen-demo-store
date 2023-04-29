import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const cartRecomendationsItemImageStyle = style({
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: 122,
  width: 122
})

export const cartRecomendationsItemTitleStyle = style({
  color: vars.colors.black,
  display: 'block',
  fontSize: 14,
  fontWeight: 500,
  marginTop: 8,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})

export const cartRecomendationsItemPricetyles = style({
  color: vars.colors.black,
  display: 'block',
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 8,
  marginTop: 8,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})

export const cartRecomendationsItemAddToCartButtonStyles = style({
  minWidth: 120
})
