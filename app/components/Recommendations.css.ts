import {globalStyle, style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const recommendationsStyle = style({
  marginBottom: 88,
  paddingTop: 48
})

export const recommendationsTitleStyle = style({
  color: vars.colors.black,
  fontSize: 22,
  lineHeight: '30px',
  marginBottom: 32
})

export const recommendationsSwiperWrapperStyle = style({
  height: 365,
  width: '100%'
})

globalStyle(`${recommendationsSwiperWrapperStyle} .swiper`, {
  height: '100%'
})

globalStyle(`${recommendationsSwiperWrapperStyle} .swiper-slide`, {
  borderRadius: 4,
  height: '100%',
  width: 218
})

export const recommendationsSwipperStyle = style({})
