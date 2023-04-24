import type {
  CartLineEdge,
  Product
} from '@shopify/hydrogen/storefront-api-types'
import classnames from 'classnames'
import type {FunctionComponent} from 'react'
import {useMemo} from 'react'

import type {ProductType} from '~/types/product'
import {ProductSchema} from '~/types/product'

import {ProductImageStyle} from './ProductImage.css'

interface ProductImageProps {
  cartLineEdge?: CartLineEdge
  className?: string
  product?: Product
}

export const ProductImage: FunctionComponent<ProductImageProps> = ({
  cartLineEdge,
  className,
  product
}) => {
  const stronglyTypedProduct: ProductType | undefined = useMemo(() => {
    try {
      return ProductSchema.parse(product)
    } catch {
      return undefined
    }
  }, [product])

  const productImageStyles = useMemo(() => {
    if (cartLineEdge) {
      return {
        backgroundImage: `url(${cartLineEdge.node.merchandise.image?.url})`
      }
    }

    if (stronglyTypedProduct) {
      return {
        backgroundImage: `url(${stronglyTypedProduct.media.nodes[0]?.image.url})`
      }
    }

    return undefined
  }, [cartLineEdge, stronglyTypedProduct])

  return (
    <div
      className={classnames(ProductImageStyle, className)}
      style={productImageStyles}
    />
  )
}
