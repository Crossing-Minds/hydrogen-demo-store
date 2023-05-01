import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const newReleasesStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginBottom: 88,
  paddingTop: 48,
  textAlign: 'center'
})

export const newReleasesTitleStyle = style({
  color: vars.colors.black,
  fontSize: 22,
  fontWeight: 600,
  lineHeight: '30px',
  marginBottom: 32
})
