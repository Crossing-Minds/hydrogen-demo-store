import {useRecordItemInteractions} from '@crossingminds/beam-react'
import type {
  Product,
  ProductVariant
} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {useMemo} from 'react'

import {BEAM_REACT_OPTIONS} from '~/beam/config'
import {sessionId} from '~/utils/sessionId.client'
import {SHOPIFY_ENTITY_TYPES, getIdFromShopifyEntityId} from '~/utils/shopify'

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
  const {recordItemClickInteraction} = useRecordItemInteractions({
    ...BEAM_REACT_OPTIONS,
    sessionId
  })

  const productVariant = useMemo(() => {
    return product.variants.nodes[0] as ProductVariant
  }, [product])

  const productVariantId = useMemo(
    () =>
      getIdFromShopifyEntityId(
        SHOPIFY_ENTITY_TYPES.PRODUCT_VARIANT,
        productVariant.id
      ),
    [productVariant]
  )

  return (
    <div className={collectionProductStyle}>
      <a
        href={`/products/${productVariant.product.handle}?variant=${productVariantId}`}
        onClick={() =>
          productVariantId && recordItemClickInteraction(productVariantId)
        }
      >
        <ProductImage
          className={collectionProductImageStyle}
          productVariant={productVariant}
        />
      </a>
      <p className={collectionProductNameStyle}>
        {productVariant.product.title}
      </p>
      <p className={collectionProductPriceStyle}>
        ${productVariant.price.amount}
      </p>
    </div>
  )
}
