import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const productListStyle = style({
  marginTop: 32
})

export const productListTitleStyle = style({
  color: vars.colors.black,
  fontSize: 22,
  lineHeight: '30px',
  marginBottom: 16
})

export const productListFiltersStyle = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginBottom: 16,
  '@media': {
    '(min-width: 1024px)': {
      flexDirection: 'row'
    }
  }
})

export const productListGridStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '18px 8px',
  marginBottom: 24
})

export const productListPaginationStyle = style({
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

export const productListPaginationItemStyle = style({
  alignItems: 'center',
  borderRadius: 4,
  color: vars.colors.black,
  display: 'flex',
  fontSize: 16,
  lineHeight: '24px',
  padding: '4px 8px'
})

export const productListPaginationItemActiveStyle = style([
  productListPaginationItemStyle,
  {
    background: vars.colors.lightBlue01
  }
])
