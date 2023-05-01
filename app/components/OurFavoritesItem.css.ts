import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const ourFavoritesItemStyle = style({
  display: 'flex',
  flex: '1 1 100%',
  flexDirection: 'column',
  '@media': {
    '(min-width: 1024px)': {
      flex: '1 1 30%'
    }
  }
})

export const ourFavoritesItemImageStyle = style({
  borderRadius: 4,
  height: 256,
  width: '100%'
})

export const ourFavoritesItemTitleStyle = style({
  color: vars.colors.black,
  display: 'block',
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 18,
  marginTop: 16,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})
