import type {FunctionComponent} from 'react'

import type {ProductType} from '~/types/product'

import {
  ourFavoritesItemImageStyle,
  ourFavoritesItemStyle,
  ourFavoritesItemTitleStyle
} from './OurFavoritesItem.css'
import {ProductImage} from './ProductImage'

interface OurFavoritesItemProps {
  product: ProductType
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
