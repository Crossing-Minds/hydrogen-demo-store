import {useRecordItemInteractions} from '@crossingminds/beam-react'
import {useFetcher, useMatches} from '@remix-run/react'
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {useMemo} from 'react'

import {BEAM_REACT_OPTIONS} from '~/beam/config'
import {sessionId} from '~/utils/sessionId.client'
import {SHOPIFY_ENTITY_TYPES, getIdFromShopifyEntityId} from '~/utils/shopify'

import {AddToCartButton} from './AddToCartButton'
import {
  cartRecommendationsItemAddToCartButtonStyles,
  cartRecommendationsItemImageStyle,
  cartRecommendationsItemTitleStyle
} from './CartRecommendationsItem.css'
import {ProductImage} from './ProductImage'

interface CartRecommendationsItemProps {
  productVariant: ProductVariant
}

export const CartRecommendationsItem: FunctionComponent<
  CartRecommendationsItemProps
> = ({productVariant}) => {
  const [root] = useMatches()
  const selectedLocale = root?.data?.selectedLocale
  const fetcher = useFetcher()
  const lines = [{merchandiseId: productVariant.id, quantity: 1}]

  const {recordAddItemToCartInteraction, recordItemClickInteraction} =
    useRecordItemInteractions({
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
    <>
      <a
        href={`/products/${productVariant.product.handle}?variant=${productVariantId}`}
        onClick={() =>
          productVariantId && recordItemClickInteraction(productVariantId)
        }
      >
        <ProductImage
          className={cartRecommendationsItemImageStyle}
          productVariant={productVariant}
        />
        <p className={cartRecommendationsItemTitleStyle}>
          {productVariant.product.title}
        </p>
      </a>
      <fetcher.Form
        action="/cart"
        method="post"
        onSubmit={() =>
          productVariantId && recordAddItemToCartInteraction(productVariantId)
        }
      >
        <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
        <input
          type="hidden"
          name="countryCode"
          value={selectedLocale?.country ?? 'US'}
        />
        <input type="hidden" name="lines" value={JSON.stringify(lines)} />

        <AddToCartButton
          className={cartRecommendationsItemAddToCartButtonStyles}
          productVariantShopifyId={productVariant.id}
        />
      </fetcher.Form>
    </>
  )
}
