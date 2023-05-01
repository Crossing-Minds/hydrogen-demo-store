import {keyframes, style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const CartDrawerLineStyle = style({
  display: 'flex',
  gap: 16
})

const flicker = keyframes({
  '0%': {opacity: 1},
  '100%': {opacity: 0.3}
})

export const CartDrawerDeletingLineStyle = style({
  animationDuration: '1.2s',
  animationName: flicker
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
  alignItems: 'center',
  display: 'flex',
  height: 24,
  justifyContent: 'space-between'
})

export const CartDrawerLineRemoveButtonStyle = style({
  background: 'none',
  border: 0,
  cursor: 'pointer'
})

const rotation = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'}
})

export const CartDrawerLineButtonLoaderStyle = style({
  animationDuration: '1s',
  animationIterationCount: 'infinite',
  animationName: rotation,
  animationTimingFunction: 'linear',
  border: '2px solid',
  borderColor: vars.colors.black,
  borderRadius: '50%',
  borderTopColor: 'transparent',
  boxSizing: 'border-box',
  display: 'inline-block',
  height: 16,
  width: 16
})
