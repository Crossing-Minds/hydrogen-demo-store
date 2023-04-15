import type {FunctionComponent} from 'react'

import {
  ourFavoritesItemImageStyle,
  ourFavoritesItemStyle,
  ourFavoritesItemTitleStyle
} from './OurFavoritesItem.css'

export const OurFavoritesItem: FunctionComponent = () => {
  return (
    <div className={ourFavoritesItemStyle}>
      <div className={ourFavoritesItemImageStyle}></div>
      <p className={ourFavoritesItemTitleStyle}>Featured product</p>
    </div>
  )
}
