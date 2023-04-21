import type {Image, Product} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'

import {
  ourFavoritesStyle,
  ourFavoritesTitleStyle,
  ourFavoritesWrapperStyle
} from './OurFavorites.css'
import {OurFavoritesItem} from './OurFavoritesItem'

interface OurFavoritesProps {
  products: Product[]
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
