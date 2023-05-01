import {
  getItemBasedRecommendations,
  getPersonalizedRecommendations
} from '@crossingminds/beam-react'
import {useLoaderData} from '@remix-run/react'
import type {LoaderArgs, MetaFunction} from '@shopify/remix-oxygen'
import {json} from '@shopify/remix-oxygen'

import {BEAM_REACT_OPTIONS} from '~/beam/config'
import {ProductDetail} from '~/components/ProductDetail'
import {Recommendations} from '~/components/Recommendations'
import {
  PRODUCTS_BY_VARIANT_QUERY,
  PRODUCT_BY_VARIANT_QUERY
} from '~/queries/product'
import {commitSession, getSessionAndSessionId} from '~/sessions'
import {
  RECOMMENDATION_SCENARIOS,
  removeDuplicatedIdsAndGetFirstNth
} from '~/utils/recommendations'
import {
  SHOPIFY_ENTITY_TYPES,
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
        id: getShopifyEntityIdFromId(
          SHOPIFY_ENTITY_TYPES.PRODUCT_VARIANT,
          variant
        )
      }
    }
  )

  if (!productVariant?.id) {
    throw new Response(undefined, {status: 404})
  }

  const productVariantId = getIdFromShopifyEntityId(
    SHOPIFY_ENTITY_TYPES.PRODUCT_VARIANT,
    productVariant.id
  )

  const {itemIds: variantIdsForPurchasedOrViewed} =
    await getItemBasedRecommendations({
      ...BEAM_REACT_OPTIONS,
      sessionId,
      itemId: productVariantId,
      options: {
        scenario: RECOMMENDATION_SCENARIOS.PDP_CUSTOMERS_ALSO_PURCHASES,
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
      contextItems: [{itemId: productVariantId}],
      sessionWithContextScenario:
        RECOMMENDATION_SCENARIOS.PDP_RECOMMENDATIONS_FOR_YOU
    })

  const {nodes: productVariantsForRecommendations} =
    await context.storefront.query<Promise<any>>(PRODUCTS_BY_VARIANT_QUERY, {
      variables: {
        ids: removeDuplicatedIdsAndGetFirstNth(
          variantIdsForRecommendations,
          variantIdsForPurchasedOrViewed,
          8
        ).map(variantId => `gid://shopify/ProductVariant/${variantId}`)
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

export const shouldRevalidate = () => false

export const meta: MetaFunction<typeof loader> = ({data: {productVariant}}) => {
  return {
    title: `${productVariant.product.title} - Crossing Minds Beam Demo Store`,
    description: productVariant.product.descriptionHtml
  }
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
        title="Picked just for you"
      />
      {productVariantsForRecommendations?.length ? (
        <Recommendations
          productVariants={productVariantsForRecommendations}
          title="You might also like"
        />
      ) : undefined}
    </>
  )
}
