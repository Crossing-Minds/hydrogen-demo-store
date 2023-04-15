import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const ourFavoritesStyle = style({
  marginBottom: 88,
  paddingTop: 48
})

export const ourFavoritesTitleStyle = style({
  color: vars.colors.black,
  fontSize: 22,
  lineHeight: '30px',
  marginBottom: 32
})

export const ourFavoritesWrapperStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8
})
