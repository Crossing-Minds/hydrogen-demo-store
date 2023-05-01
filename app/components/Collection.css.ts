import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const collectionStyle = style({
  marginTop: 84
})

export const collectionTitleStyle = style({
  color: vars.colors.black,
  fontSize: 22,
  lineHeight: '30px',
  marginBottom: 16
})

export const collectionGridStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '18px 8px',
  marginBottom: 24
})

export const collectionPaginationStyle = style({
  display: 'flex',
  gap: 6,
  justifyContent: 'center',
  listStyle: 'none',
  marginBottom: 28,
  '@media': {
    '(min-width: 1024px)': {
      gap: 16
    }
  }
})

export const collectionPaginationItemStyle = style({
  alignItems: 'center',
  borderRadius: 4,
  color: vars.colors.black,
  display: 'flex',
  fontSize: 16,
  lineHeight: '24px',
  padding: '4px 8px'
})

export const collectionPaginationButtonStyle = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  width: 105
})
