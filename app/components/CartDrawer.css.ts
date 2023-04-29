import {style} from '@vanilla-extract/css'

export const CartDrawerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 68px)',
  padding: '0 24px 16px'
})

export const CartDrawerInfoStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%'
})

export const CartDrawerSubtotalStyle = style({
  fontWeight: 600
})

export const CartDrawerProductsStyle = style({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  gap: 16,
  overflowY: 'auto',
  margin: '16px 0',
  width: '100%'
})

export const CartDrawerRecommendationsStyle = style({
  height: 310,
  width: '100%'
})
