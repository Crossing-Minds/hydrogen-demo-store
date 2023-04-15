import type {ComplexStyleRule} from '@vanilla-extract/css'
import {style, styleVariants} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export type ButtonVariant = 'primary' | 'secondary' | 'hero'

const buttonStyleBase = style({
  border: 0,
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 14,
  outline: 'inherit',
  padding: '8px 24px'
})

export const buttonStyle = styleVariants<
  Record<ButtonVariant, ComplexStyleRule>
>({
  primary: [
    buttonStyleBase,
    {
      background: vars.colors.black,
      color: vars.colors.white
    }
  ],
  secondary: [
    buttonStyleBase,
    {
      background: vars.colors.white,
      color: vars.colors.black
    }
  ],
  hero: [
    buttonStyleBase,
    {
      background: vars.colors.black,
      color: vars.colors.white,
      fontSize: 20,
      fontWeight: 600
    }
  ]
})
