import {
  SCENARIO_OMITTED,
  getItemBasedRecommendations,
  getPersonalizedRecommendations
} from '@crossingminds/beam-react'
import {useLoaderData} from '@remix-run/react'
import type {Product} from '@shopify/hydrogen/storefront-api-types'
import type {LoaderArgs} from '@shopify/remix-oxygen'
import {json} from '@shopify/remix-oxygen'

import {BEAM_REACT_OPTIONS, getRandomProductVariantIds} from '~/beam/config'
import {ProductDetail} from '~/components/ProductDetail'
import {Recomendations} from '~/components/Recomendations'
import {PRODUCTS_BY_VARIANT_QUERY, PRODUCT_QUERY} from '~/queries/product'
import {commitSession, getSessionAndSessionId} from '~/sessions'
import {getIdFromShopifyEntityId} from '~/utils/shopify'

export const loader = async ({context, params, request}: LoaderArgs) => {
  const {session, sessionId} = await getSessionAndSessionId(request)
  const {handle} = params
  const {product} = await context.storefront.query<Promise<any>>(
    PRODUCT_QUERY,
    {
      variables: {
        handle
      }
    }
  )

  if (!product?.id) {
    throw new Response(undefined, {status: 404})
  }

  const {itemIds: variantIdsForPurchasedOrViewed} =
    await getItemBasedRecommendations({
      ...BEAM_REACT_OPTIONS,
      sessionId,
      itemId: getIdFromShopifyEntityId(
        'ProductVariant',
        (product as Product).variants.nodes[0]?.id
      ),
      options: {
        maxResults: 8
      }
    })

  const {nodes: productForPurchasedOrViewed} = await context.storefront.query<
    Promise<any>
  >(PRODUCTS_BY_VARIANT_QUERY, {
    variables: {
      ids: variantIdsForPurchasedOrViewed.map(
        variantId => `gid://shopify/ProductVariant/${variantId}`
      )
    }
  })

  // TODO: when personalized recommendations are working, use the following code
  // const {itemIds: variantIdsForRecommendations} =
  //   await getPersonalizedRecommendations({
  //     ...BEAM_REACT_OPTIONS,
  //     sessionId,
  //     maxResults: 8,
  //     sessionScenario: SCENARIO_OMITTED // TODO: add scenario
  //   })
  const variantIdsForRecommendations = getRandomProductVariantIds(8)

  const {nodes: productForRecommendations} = await context.storefront.query<
    Promise<any>
  >(PRODUCTS_BY_VARIANT_QUERY, {
    variables: {
      ids: variantIdsForRecommendations.map(
        variantId => `gid://shopify/ProductVariant/${variantId}`
      )
    }
  })

  return json(
    {
      handle,
      product,
      productForPurchasedOrViewed,
      productForRecommendations
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session)
      }
    }
  )
}

export default function ProductHandle() {
  const {product, productForPurchasedOrViewed, productForRecommendations} =
    useLoaderData<typeof loader>()

  return (
    <>
      <ProductDetail product={product} />
      <Recomendations
        products={productForPurchasedOrViewed}
        title="Customers also purchased or viewed"
      />
      {productForRecommendations?.length ? (
        <Recomendations
          products={productForRecommendations}
          title="Recommendations for you"
        />
      ) : undefined}
    </>
  )
}
