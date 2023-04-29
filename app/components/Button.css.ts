import type {ComplexStyleRule} from '@vanilla-extract/css'
import {keyframes, style, styleVariants} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'hero'
  | 'outlined'
  | 'pagination'

const buttonBaseStyle = style({
  border: 0,
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 14,
  height: 37,
  outline: 'inherit',
  padding: '8px 24px'
})

export const buttonStyle = styleVariants<
  Record<ButtonVariant, ComplexStyleRule>
>({
  primary: [
    buttonBaseStyle,
    {
      background: vars.colors.black,
      color: vars.colors.white
    }
  ],
  secondary: [
    buttonBaseStyle,
    {
      background: vars.colors.white,
      color: vars.colors.black
    }
  ],
  hero: [
    buttonBaseStyle,
    {
      background: vars.colors.black,
      color: vars.colors.white,
      fontSize: 20,
      fontWeight: 600,
      height: 46
    }
  ],
  outlined: [
    buttonBaseStyle,
    {
      background: vars.colors.white,
      border: '1px solid',
      borderColor: vars.colors.black,
      color: vars.colors.black
    }
  ],
  pagination: [
    buttonBaseStyle,
    {
      background: vars.colors.white,
      border: '1px solid',
      borderColor: vars.colors.black,
      borderRadius: 40,
      color: vars.colors.black,
      padding: '4px 12px'
    }
  ]
})

export const buttonDisabledStyle = style({
  cursor: 'unset',
  opacity: 0.5
})

export const buttonLoadingStyle = style({
  background: vars.colors.lightGrey04,
  cursor: 'unset'
})

const rotation = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'}
})

export const buttonLoaderStyle = style({
  animationDuration: '1s',
  animationIterationCount: 'infinite',
  animationName: rotation,
  animationTimingFunction: 'linear',
  border: '2px solid',
  borderColor: vars.colors.white,
  borderRadius: '50%',
  borderTopColor: 'transparent',
  boxSizing: 'border-box',
  display: 'inline-block',
  height: 20,
  width: 20
})
