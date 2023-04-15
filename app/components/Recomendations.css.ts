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
  left: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  position: 'relative',
  right: '50%',
  width: '100vw'
})

globalStyle(`${recomendationsSwiperWrapperStyle} .swiper`, {
  height: '100%'
})

globalStyle(`${recomendationsSwiperWrapperStyle} .swiper-slide`, {
  borderRadius: 4,
  height: '100%',
  width: 240
})

globalStyle(`${recomendationsSwiperWrapperStyle} .swiper-wrapper`, {
  paddingLeft: 32,
  '@media': {
    '(min-width: 1024px)': {
      paddingLeft: 'calc(calc(100vw - 896px)/2)'
    }
  }
})

export const recomendationsSwipperStyle = style({})
