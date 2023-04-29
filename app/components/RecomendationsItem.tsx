import {useRecordItemInteractions} from '@crossingminds/beam-react'
import {useFetcher, useMatches} from '@remix-run/react'
import type {Product} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {useMemo} from 'react'

import {BEAM_REACT_OPTIONS} from '~/beam/config'
import {sessionId} from '~/utils/sessionId.client'

import {AddToCartButton} from './AddToCartButton'
import {ProductImage} from './ProductImage'
import {
  recomendationsItemAddToCartButtonStyles,
  recomendationsItemImageStyle,
  recomendationsItemPricetyles,
  recomendationsItemTitleStyle
} from './RecomendationsItem.css'

interface RecomendationsItemProps {
  product: Product
}

export const RecomendationsItem: FunctionComponent<RecomendationsItemProps> = ({
  product
}) => {
  const [root] = useMatches()
  const selectedLocale = root?.data?.selectedLocale
  const fetcher = useFetcher()
  const lines = [{merchandiseId: product.variants.nodes[0]?.id, quantity: 1}]

  const {recordAddItemToCartInteraction, recordItemClickInteraction} =
    useRecordItemInteractions({
      ...BEAM_REACT_OPTIONS,
      sessionId
    })

  const longId = product.variants.nodes[0]?.id
  const itemId = useMemo(() => longId?.split('/').at(-1), [longId])

  return (
    <>
      <a
        href={`/products/${product.handle}`}
        onClick={() => itemId && recordItemClickInteraction(itemId)}
      >
        <ProductImage
          className={recomendationsItemImageStyle}
          product={product}
        />
        <p className={recomendationsItemTitleStyle}>{product.title}</p>
      </a>
      <p className={recomendationsItemPricetyles}>
        ${product.variants.nodes[0]?.price.amount}
      </p>
      <fetcher.Form
        action="/"
        method="post"
        onSubmit={() => itemId && recordAddItemToCartInteraction(itemId)}
      >
        <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
        <input
          type="hidden"
          name="countryCode"
          value={selectedLocale?.country ?? 'US'}
        />
        <input type="hidden" name="lines" value={JSON.stringify(lines)} />

        <AddToCartButton
          className={recomendationsItemAddToCartButtonStyles}
          productVariant={product.variants.nodes[0]?.id as string}
        />
      </fetcher.Form>
    </>
  )
}
