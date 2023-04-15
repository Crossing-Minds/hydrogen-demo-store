import type {FunctionComponent} from 'react'

import {
  ourFavoritesStyle,
  ourFavoritesTitleStyle,
  ourFavoritesWrapperStyle
} from './OurFavorites.css'
import {OurFavoritesItem} from './OurFavoritesItem'

export const OurFavorites: FunctionComponent = () => {
  return (
    <div className={ourFavoritesStyle}>
      <h2 className={ourFavoritesTitleStyle}>Our favorites</h2>
      <div className={ourFavoritesWrapperStyle}>
        {[0, 1, 2, 3, 4, 5].map(n => (
          <OurFavoritesItem key={n} />
        ))}
      </div>
    </div>
  )
}
