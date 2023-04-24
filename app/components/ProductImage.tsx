import classnames from 'classnames'
import type {FunctionComponent} from 'react'
import {useMemo} from 'react'

import type {ProductType} from '~/types/product'
import {ProductSchema} from '~/types/product'

import {ProductImageStyle} from './ProductImage.css'

interface ProductImageProps {
  className?: string
  product: ProductType
}

export const ProductImage: FunctionComponent<ProductImageProps> = ({
  className,
  product
}) => {
  const productImageStyles = useMemo(() => {
    try {
      ProductSchema.parse(product)

      return {backgroundImage: `url(${product.media.nodes[0]?.image.url})`}
    } catch {
      return undefined
    }
  }, [product])

  return (
    <div
      className={classnames(ProductImageStyle, className)}
      style={productImageStyles}
    />
  )
}
