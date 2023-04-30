import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'

import {
  ourFavoritesStyle,
  ourFavoritesTitleStyle,
  ourFavoritesWrapperStyle
} from './OurFavorites.css'
import {OurFavoritesItem} from './OurFavoritesItem'

interface OurFavoritesProps {
  productVariants: ProductVariant[]
}

export const OurFavorites: FunctionComponent<OurFavoritesProps> = ({
  productVariants
}) => {
  return (
    <div className={ourFavoritesStyle}>
      <h2 className={ourFavoritesTitleStyle}>Our favorites</h2>
      <div className={ourFavoritesWrapperStyle}>
        {productVariants.map(productVariant => (
          <OurFavoritesItem
            key={productVariant.id}
            productVariant={productVariant}
          />
        ))}
      </div>
    </div>
  )
}
