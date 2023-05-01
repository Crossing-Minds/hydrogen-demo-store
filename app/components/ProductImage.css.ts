import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const ProductImageStyle = style({
  backgroundColor: vars.colors.lightGrey04,
  backgroundPosition: 'center',
  backgroundSize: 'cover'
})
