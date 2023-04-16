import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const productListItemStyle = style({
  display: 'flex',
  flex: '1 0 40%',
  flexDirection: 'column',
  gap: 8,
  '@media': {
    '(min-width: 1024px)': {
      flex: '1 0 21%'
    }
  }
})

export const productListItemImageStyle = style({
  background: vars.colors.lightGrey04,
  borderRadius: 4,
  height: 256
})

export const productListItemNameStyle = style({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px'
})

export const productListItemPriceStyle = style({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px'
})
