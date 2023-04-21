import type {MediaImage, Product} from '@shopify/hydrogen/storefront-api-types'
import classnames from 'classnames'
import type {FunctionComponent} from 'react'

import {ProductImageStyle} from './ProductImage.css'

interface ProductImageProps {
  className?: string
  product: Product
}

export const ProductImage: FunctionComponent<ProductImageProps> = ({
  className,
  product
}) => {
  const productImageUrl = (product.media.nodes[0] as MediaImage)?.image?.url

  return (
    <div
      className={classnames(ProductImageStyle, className)}
      style={{backgroundImage: `url(${productImageUrl})`}}
    />
  )
}
