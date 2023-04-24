import {
  getItemBasedRecommendations,
  getPersonalizedRecommendations
} from '@crossingminds/beam-react'
import {useLoaderData} from '@remix-run/react'
import type {Product} from '@shopify/hydrogen/storefront-api-types'
import type {LoaderArgs} from '@shopify/remix-oxygen'

import {BEAM_REACT_OPTIONS} from '~/beam/config'
import {ProductDetail} from '~/components/ProductDetail'
import {Recomendations} from '~/components/Recomendations'
import {PRODUCTS_BY_VARIANT_QUERY, PRODUCT_QUERY} from '~/queries/product'
import {getIdFromShopifyEntityId} from '~/utils/shopify'

export const loader = async ({context, params}: LoaderArgs) => {
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
    await getPersonalizedRecommendations({
      ...BEAM_REACT_OPTIONS,
      sessionId: 'db9c11f3-F85D-417E-F3F5-8543BC1A1DE1',
      maxResults: 8,
      clientOptions: {
        endpointBasePath: 'https://staging-api.crossingminds.com'
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

  const {itemIds: variantIdsForRecommendations} =
    await getItemBasedRecommendations({
      ...BEAM_REACT_OPTIONS,
      sessionId: 'db9c11f3-F85D-417E-F3F5-8543BC1A1DE1',
      itemId: getIdFromShopifyEntityId(
        'ProductVariant',
        (product as Product).variants.nodes[0]?.id
      ),
      options: {
        maxResults: 9
      },
      clientOptions: {
        endpointBasePath: 'https://staging-api.crossingminds.com'
      }
    })

  const {nodes: productForRecommendations} = await context.storefront.query<
    Promise<any>
  >(PRODUCTS_BY_VARIANT_QUERY, {
    variables: {
      ids: variantIdsForRecommendations.map(
        variantId => `gid://shopify/ProductVariant/${variantId}`
      )
    }
  })

  return {
    handle,
    product,
    productForPurchasedOrViewed,
    productForRecommendations
  }
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
      <Recomendations
        products={productForRecommendations}
        title="Recommendations for you"
      />
    </>
  )
}
