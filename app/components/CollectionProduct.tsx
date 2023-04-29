import type {Product} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'

import {
  collectionProductImageStyle,
  collectionProductNameStyle,
  collectionProductPriceStyle,
  collectionProductStyle
} from './CollectionProduct.css'
import {ProductImage} from './ProductImage'

interface CollectionProductProps {
  product: Product
}

export const CollectionProduct: FunctionComponent<CollectionProductProps> = ({
  product
}) => {
  return (
    <div className={collectionProductStyle}>
      <ProductImage className={collectionProductImageStyle} product={product} />
      <p className={collectionProductNameStyle}>{product.title}</p>
      <p className={collectionProductPriceStyle}>
        ${product.variants.nodes[0]?.price.amount}
      </p>
    </div>
  )
}
