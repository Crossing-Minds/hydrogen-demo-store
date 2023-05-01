import {globalStyle, style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const productDetailStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 100,
  '@media': {
    '(min-width: 1024px)': {
      flexDirection: 'row',
      gap: 40
    }
  }
})

export const productDetailImageStyle = style({
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: 395,
  width: '100%',
  '@media': {
    '(min-width: 1024px)': {
      height: 706,
      width: 584
    }
  }
})

export const productDetailWrapperStyle = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: 16
})

export const productDetailTitleStyle = style({
  color: vars.colors.black,
  fontSize: 28,
  fontWeight: 600,
  lineHeight: '36px'
})

export const productDetailPriceStyle = style({
  color: vars.colors.black,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px'
})

export const productDetailAttributeStyle = style({
  color: vars.colors.black,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '20px'
})

export const productDetailCTAsStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%'
})

globalStyle(`${productDetailCTAsStyle} button`, {
  width: '100%'
})

export const productDetailDescriptionStyle = style({
  color: vars.colors.black,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px'
})

export const productDetailTagContainerStyle = style({
  display: 'flex',
  gap: 10
})

export const productDetailTagListStyle = style({
  listStyle: 'none'
})

export const productDetailTagListItemStyle = style({
  border: '1px solid',
  borderRadius: 4,
  display: 'inline-flex',
  fontSize: 13,
  lineHeight: '14px',
  marginBottom: 4,
  marginRight: 10,
  padding: '3px 7px'
})
