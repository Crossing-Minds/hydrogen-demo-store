import {Link} from '@remix-run/react'
import type {Product} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'

import {
  ourFavoritesItemImageStyle,
  ourFavoritesItemStyle,
  ourFavoritesItemTitleStyle
} from './OurFavoritesItem.css'
import {ProductImage} from './ProductImage'

interface OurFavoritesItemProps {
  product: Product
}

export const OurFavoritesItem: FunctionComponent<OurFavoritesItemProps> = ({
  product
}) => {
  return (
    <div className={ourFavoritesItemStyle}>
      <a href={`/products/${product.handle}`}>
        <ProductImage
          className={ourFavoritesItemImageStyle}
          product={product}
        />
        <p className={ourFavoritesItemTitleStyle}>{product.title}</p>
      </a>
    </div>
  )
}
