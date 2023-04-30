import type {
  CartLineEdge,
  ProductVariant
} from '@shopify/hydrogen/storefront-api-types'
import classnames from 'classnames'
import type {FunctionComponent} from 'react'
import {useMemo} from 'react'

import type {ProductVariantType} from '~/types/product'
import {ProductVariantSchema} from '~/types/product'

import {ProductImageStyle} from './ProductImage.css'

interface ProductImageProps {
  cartLineEdge?: CartLineEdge
  className?: string
  productVariant?: ProductVariant
}

export const ProductImage: FunctionComponent<ProductImageProps> = ({
  cartLineEdge,
  className,
  productVariant
}) => {
  const stronglyTypedProductVariant: ProductVariantType | undefined =
    useMemo(() => {
      try {
        return ProductVariantSchema.parse(productVariant)
      } catch {
        return undefined
      }
    }, [productVariant])

  const productImageStyles = useMemo(() => {
    if (cartLineEdge) {
      return {
        backgroundImage: `url(${cartLineEdge.node.merchandise.image?.url})`
      }
    }

    if (stronglyTypedProductVariant) {
      return {
        backgroundImage: `url(${stronglyTypedProductVariant.image.url})`
      }
    }

    return undefined
  }, [cartLineEdge, stronglyTypedProductVariant])

  return (
    <div
      className={classnames(ProductImageStyle, className)}
      style={productImageStyles}
    />
  )
}
