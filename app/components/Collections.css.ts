import {globalStyle, style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const collectionsStyle = style({
  marginBottom: 88,
  paddingTop: 48
})

export const collectionsTitleStyle = style({
  color: vars.colors.black,
  fontSize: 22,
  lineHeight: '30px',
  marginBottom: 32
})

export const collectionsSwiperWrapperStyle = style({
  height: 298,
  width: '100%'
})

globalStyle(`${collectionsSwiperWrapperStyle} .swiper`, {
  height: '100%'
})

globalStyle(`${collectionsSwiperWrapperStyle} .swiper-slide`, {
  borderRadius: 4,
  height: '100%',
  width: 326,
  '@media': {
    '(min-width: 1024px)': {
      width: 444
    }
  }
})

export const collectionsSwipperStyle = style({})
