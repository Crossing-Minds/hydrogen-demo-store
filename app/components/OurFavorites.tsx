import type {FunctionComponent} from 'react'

import type {ProductType} from '~/types/product'

import {
  ourFavoritesStyle,
  ourFavoritesTitleStyle,
  ourFavoritesWrapperStyle
} from './OurFavorites.css'
import {OurFavoritesItem} from './OurFavoritesItem'

interface OurFavoritesProps {
  products: ProductType[]
}

export const OurFavorites: FunctionComponent<OurFavoritesProps> = ({
  products
}) => {
  return (
    <div className={ourFavoritesStyle}>
      <h2 className={ourFavoritesTitleStyle}>Our favorites</h2>
      <div className={ourFavoritesWrapperStyle}>
        {products.map(product => (
          <OurFavoritesItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
