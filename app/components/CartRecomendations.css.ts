import {globalStyle, keyframes, style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const cartRecomendationsStyle = style({
  marginBottom: 88,
  paddingTop: 48
})

export const cartRecomendationsTitleStyle = style({
  color: vars.colors.black,
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  marginBottom: 16
})

export const cartRecomendationsSwiperWrapperStyle = style({
  height: 225,
  width: '100%'
})

globalStyle(`${cartRecomendationsSwiperWrapperStyle} .swiper`, {
  height: '100%'
})

globalStyle(`${cartRecomendationsSwiperWrapperStyle} .swiper-slide`, {
  borderRadius: 4,
  height: '100%',
  width: 122
})

const flicker = keyframes({
  '0%': {opacity: 1},
  '50%': {opacity: 0.5},
  '100%': {opacity: 1}
})

export const cartRecomendationsLoadingStyle = style({
  animationDuration: '1.2s',
  animationIterationCount: 'infinite',
  animationName: flicker
})
