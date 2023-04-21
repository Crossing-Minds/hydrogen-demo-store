import {Link} from '@remix-run/react'
import type {Product} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'

import {Button} from './Button'
import {ProductImage} from './ProductImage'
import {
  recomendationsItemImageStyle,
  recomendationsItemPricetyles,
  recomendationsItemTitleStyle
} from './RecomendationsItem.css'

interface RecomendationsItemProps {
  product: Product
}

export const RecomendationsItem: FunctionComponent<RecomendationsItemProps> = ({
  product
}) => {
  return (
    <>
      <a href={`/products/${product.handle}`}>
        <ProductImage
          className={recomendationsItemImageStyle}
          product={product}
        />
        <p className={recomendationsItemTitleStyle}>{product.title}</p>
      </a>
      <p className={recomendationsItemPricetyles}>
        ${product.variants.nodes[0]?.price.amount}
      </p>
      <Button onClick={() => undefined} title="Add to cart" />
    </>
  )
}
