import {style} from '@vanilla-extract/css'

export const layoutStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  margin: '0 auto',
  padding: '0 32px',
  width: '100%',
  '@media': {
    '(min-width: 1024px)': {
      maxWidth: 896,
      padding: 0
    }
  }
})

export const layoutContentWrapperStyle = style({
  flex: '1 0 auto'
})

export const layoutFooterWrapperStyle = style({
  flexShrink: 0
})
