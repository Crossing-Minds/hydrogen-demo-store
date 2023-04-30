import {useRecordItemInteractions} from '@crossingminds/beam-react'
import {useFetcher, useMatches} from '@remix-run/react'
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {useEffect, useMemo} from 'react'

import {BEAM_REACT_OPTIONS} from '~/beam/config'
import {sessionId} from '~/utils/sessionId.client'
import {SHOPIFY_ENTITY_TYPES, getIdFromShopifyEntityId} from '~/utils/shopify'

import {AddToCartButton} from './AddToCartButton'
import {
  productDetailAttributeStyle,
  productDetailCTAsStyle,
  productDetailDescriptionStyle,
  productDetailImageStyle,
  productDetailPriceStyle,
  productDetailStyle,
  productDetailTitleStyle,
  productDetailWrapperStyle
} from './ProductDetail.css'
import {ProductImage} from './ProductImage'

interface ButtonProps {
  productVariant: ProductVariant
}

export const ProductDetail: FunctionComponent<ButtonProps> = ({
  productVariant
}) => {
  const [root] = useMatches()
  const selectedLocale = root?.data?.selectedLocale
  const fetcher = useFetcher()
  const lines = [{merchandiseId: productVariant.id, quantity: 1}]

  const {recordItemPageViewInteraction, recordAddItemToCartInteraction} =
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

  useEffect(() => {
    if (productVariantId) {
      recordItemPageViewInteraction(productVariantId)
    }
  }, [productVariantId, productVariant, recordItemPageViewInteraction])

  return (
    <div className={productDetailStyle}>
      <ProductImage
        className={productDetailImageStyle}
        productVariant={productVariant}
      />
      <div className={productDetailWrapperStyle}>
        <h1 className={productDetailTitleStyle}>
          {productVariant.product.title}
        </h1>
        <p className={productDetailPriceStyle}>
          ${productVariant.price.amount}
        </p>
        <p className={productDetailAttributeStyle}>Color: White</p>
        <p className={productDetailAttributeStyle}>Size: M</p>
        <div>
          <p className={productDetailAttributeStyle}>Quantity</p>
        </div>
        <div className={productDetailCTAsStyle}>
          <fetcher.Form
            action="/"
            method="post"
            onSubmit={() =>
              productVariantId &&
              recordAddItemToCartInteraction(productVariantId)
            }
          >
            <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
            <input
              type="hidden"
              name="countryCode"
              value={selectedLocale?.country ?? 'US'}
            />
            <input type="hidden" name="lines" value={JSON.stringify(lines)} />
            <AddToCartButton productVariantShopifyId={productVariant.id} />
          </fetcher.Form>
        </div>
        <div
          className={productDetailDescriptionStyle}
          dangerouslySetInnerHTML={{
            __html: productVariant.product.descriptionHtml
          }}
        />
      </div>
    </div>
  )
}
