import {useRecordItemInteractions} from '@crossingminds/beam-react'
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {useMemo} from 'react'

import {BEAM_REACT_OPTIONS} from '~/beam/config'
import {sessionId} from '~/utils/sessionId.client'
import {SHOPIFY_ENTITY_TYPES, getIdFromShopifyEntityId} from '~/utils/shopify'

import {
  ourFavoritesItemImageStyle,
  ourFavoritesItemStyle,
  ourFavoritesItemTitleStyle
} from './OurFavoritesItem.css'
import {ProductImage} from './ProductImage'

interface OurFavoritesItemProps {
  productVariant: ProductVariant
}

export const OurFavoritesItem: FunctionComponent<OurFavoritesItemProps> = ({
  productVariant
}) => {
  const {recordItemClickInteraction} = useRecordItemInteractions({
    ...BEAM_REACT_OPTIONS,
    sessionId
  })

  const productVariantId = useMemo(
    () =>
      getIdFromShopifyEntityId(
        SHOPIFY_ENTITY_TYPES.PRODUCT_VARIANT,
        productVariant.id
      ),
    [productVariant]
  )

  return (
    <div className={ourFavoritesItemStyle}>
      <a
        href={`/products/${productVariant.product.handle}?variant=${productVariantId}`}
        onClick={() =>
          productVariantId && recordItemClickInteraction(productVariantId)
        }
      >
        <ProductImage
          className={ourFavoritesItemImageStyle}
          productVariant={productVariant}
        />
        <p className={ourFavoritesItemTitleStyle}>
          {productVariant.product.title}
        </p>
      </a>
    </div>
  )
}
