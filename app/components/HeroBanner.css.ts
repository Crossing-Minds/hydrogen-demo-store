import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const heroBannerStyle = style({
  alignItems: 'center',
  backgroundColor: vars.colors.lightGrey04,
  backgroundPosition: 'top',
  backgroundSize: 'cover',
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
  color: vars.colors.white,
  fontSize: 36,
  fontWeight: 600,
  lineHeight: '48px',
  marginBottom: 16
})

export const heroBannerDescription = style({
  color: vars.colors.white,
  fontSize: 14,
  lineHeight: '20px',
  marginBottom: 16
})
