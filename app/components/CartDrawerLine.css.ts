import {style} from '@vanilla-extract/css'

export const CartDrawerLineStyle = style({
  display: 'flex',
  gap: 16
})

export const CartDrawerLineImageStyle = style({
  borderRadius: 4,
  height: 94,
  width: 94
})

export const CartDrawerLineInfoWrapperStyle = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  fontSize: 14,
  gap: 8,
  width: '100%'
})

export const CartDrawerLineInfoStyle = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: 8
})

export const CartDrawerLineActionsWrapperStyle = style({
  display: 'flex',
  justifyContent: 'space-between'
})

export const CartDrawerLineRemoveButtonStyle = style({
  background: 'none',
  border: 0,
  cursor: 'pointer'
})
