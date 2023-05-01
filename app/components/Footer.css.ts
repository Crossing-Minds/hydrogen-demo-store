import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const footerStyle = style({
  background: vars.colors.lightBlue01,
  left: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  position: 'relative',
  right: '50%',
  width: '100vw'
})

export const footerWrapperStyle = style({
  alignItems: 'start',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  margin: '0 auto',
  padding: 32,
  width: '100%',
  '@media': {
    '(min-width: 1024px)': {
      flexDirection: 'row',
      justifyContent: 'space-around',
      maxWidth: 896,
      padding: '0 32px'
    }
  }
})

export const footerGroupStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '32px 0 16px',
  '@media': {
    '(min-width: 1024px)': {
      padding: '64px 0'
    }
  }
})

export const footerCategoryStyle = style({
  color: vars.colors.lightGrey07,
  fontSize: 14,
  fontWeight: 600
})

export const footerLinkStyle = style({
  color: vars.colors.lightGrey07,
  fontSize: 14
})
