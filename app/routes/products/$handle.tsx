import {
  SCENARIO_OMITTED,
  getItemBasedRecommendations,
  getPersonalizedRecommendations
} from '@crossingminds/beam-react'
import {useLoaderData} from '@remix-run/react'
import type {LoaderArgs} from '@shopify/remix-oxygen'
import {json} from '@shopify/remix-oxygen'

import {BEAM_REACT_OPTIONS} from '~/beam/config'
import {ProductDetail} from '~/components/ProductDetail'
import {Recommendations} from '~/components/Recommendations'
import {
  PRODUCTS_BY_VARIANT_QUERY,
  PRODUCT_BY_VARIANT_QUERY
} from '~/queries/product'
import {commitSession, getSessionAndSessionId} from '~/sessions'
import {removeDuplicatedIds} from '~/utils/recommendations'
import {
  getIdFromShopifyEntityId,
  getShopifyEntityIdFromId
} from '~/utils/shopify'

export const loader = async ({context, params, request}: LoaderArgs) => {
  const {session, sessionId} = await getSessionAndSessionId(request)
  const {handle} = params
  const url = new URL(request.url)
  const variant = url.searchParams.get('variant')

  if (!variant) {
    throw new Response(undefined, {status: 404})
  }

  const {node: productVariant} = await context.storefront.query<Promise<any>>(
    PRODUCT_BY_VARIANT_QUERY,
    {
      variables: {
        id: getShopifyEntityIdFromId('ProductVariant', variant)
      }
    }
  )

  if (!productVariant?.id) {
    throw new Response(undefined, {status: 404})
  }

  const {itemIds: variantIdsForPurchasedOrViewed} =
    await getItemBasedRecommendations({
      ...BEAM_REACT_OPTIONS,
      sessionId,
      itemId: getIdFromShopifyEntityId('ProductVariant', productVariant.id),
      options: {
        maxResults: 8
      }
    })

  const {nodes: productVariantsForPurchasedOrViewed} =
    await context.storefront.query<Promise<any>>(PRODUCTS_BY_VARIANT_QUERY, {
      variables: {
        ids: variantIdsForPurchasedOrViewed.map(
          variantId => `gid://shopify/ProductVariant/${variantId}`
        )
      }
    })

  const {itemIds: variantIdsForRecommendations} =
    await getPersonalizedRecommendations({
      ...BEAM_REACT_OPTIONS,
      sessionId,
      maxResults: 16,
      sessionScenario: SCENARIO_OMITTED // TODO: add scenario
    })

  const {nodes: productVariantsForRecommendations} =
    await context.storefront.query<Promise<any>>(PRODUCTS_BY_VARIANT_QUERY, {
      variables: {
        ids: removeDuplicatedIds(
          variantIdsForRecommendations,
          variantIdsForPurchasedOrViewed
        )
          .slice(0, 8)
          .map(variantId => `gid://shopify/ProductVariant/${variantId}`)
      }
    })

  return json(
    {
      handle,
      productVariant,
      productVariantsForPurchasedOrViewed,
      productVariantsForRecommendations
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session)
      }
    }
  )
}

export default function ProductHandle() {
  const {
    productVariant,
    productVariantsForPurchasedOrViewed,
    productVariantsForRecommendations
  } = useLoaderData<typeof loader>()

  return (
    <>
      <ProductDetail productVariant={productVariant} />
      <Recommendations
        productVariants={productVariantsForPurchasedOrViewed}
        title="Customers also purchased or viewed"
      />
      {productVariantsForRecommendations?.length ? (
        <Recommendations
          productVariants={productVariantsForRecommendations}
          title="Recommendations for you"
        />
      ) : undefined}
    </>
  )
}
