import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const heroBannerStyle = style({
  alignItems: 'center',
  background: vars.colors.lightGrey04,
  display: 'flex',
  height: 448,
  justifyContent: 'center',
  left: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  position: 'relative',
  right: '50%',
  width: '100vw'
})

export const heroBannerInnerStyle = style({
  textAlign: 'center'
})

export const heroBannerTitle = style({
  fontSize: 36,
  fontWeight: 600,
  lineHeight: '48px',
  marginBottom: 16
})

export const heroBannerDescription = style({
  fontSize: 14,
  lineHeight: '20px',
  marginBottom: 16
})
