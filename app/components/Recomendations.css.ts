import {globalStyle, style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const recomendationsStyle = style({
  marginBottom: 88,
  paddingTop: 48
})

export const recomendationsTitleStyle = style({
  color: vars.colors.black,
  fontSize: 22,
  lineHeight: '30px',
  marginBottom: 32
})

export const recomendationsSwiperWrapperStyle = style({
  height: 365,
  width: '100%'
})

globalStyle(`${recomendationsSwiperWrapperStyle} .swiper`, {
  height: '100%'
})

globalStyle(`${recomendationsSwiperWrapperStyle} .swiper-slide`, {
  borderRadius: 4,
  height: '100%',
  width: 218
})

export const recomendationsSwipperStyle = style({})
