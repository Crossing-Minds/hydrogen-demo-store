import {style} from '@vanilla-extract/css'

export const collectionProductStyle = style({
  display: 'flex',
  flex: '1 0 40%',
  flexDirection: 'column',
  gap: 8,
  '@media': {
    '(min-width: 1024px)': {
      flex: '1 0 21%'
    }
  }
})

export const collectionProductImageStyle = style({
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  borderRadius: 4,
  height: 256
})

export const collectionProductNameStyle = style({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px'
})

export const collectionProductPriceStyle = style({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px'
})
