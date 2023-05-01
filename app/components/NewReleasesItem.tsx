import {useRecordItemInteractions} from '@crossingminds/beam-react'
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {useMemo} from 'react'

import {BEAM_REACT_OPTIONS} from '~/beam/config'
import {sessionId} from '~/utils/sessionId.client'
import {SHOPIFY_ENTITY_TYPES, getIdFromShopifyEntityId} from '~/utils/shopify'

import {
  newReleasesItemStyle,
  newReleasesItemTitleStyle
} from './NewReleasesItem.css'

interface NewReleasesItemProps {
  productVariant: ProductVariant
}

export const NewReleasesItem: FunctionComponent<NewReleasesItemProps> = ({
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
    <a
      href={`/products/${productVariant.product.handle}?variant=${productVariantId}`}
      onClick={() =>
        productVariantId && recordItemClickInteraction(productVariantId)
      }
    >
      <div
        className={newReleasesItemStyle}
        style={{
          backgroundImage: `url(${productVariant.image?.url})`
        }}
      >
        <p className={newReleasesItemTitleStyle}>
          {productVariant.product.title}
        </p>
      </div>
    </a>
  )
}
