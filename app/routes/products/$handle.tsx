import {getPersonalizedRecommendations} from '@crossingminds/beam-react'
import {useLoaderData} from '@remix-run/react'
import type {LoaderArgs} from '@shopify/remix-oxygen'

import {BEAM_REACT_OPTIONS, getRandomProductIds} from '~/beam/config'
import {ProductDetail} from '~/components/ProductDetail'
import {Recomendations} from '~/components/Recomendations'
import {PRODUCTS_QUERY, PRODUCT_QUERY} from '~/queries/product'

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

  const {itemIds} = await getPersonalizedRecommendations({
    ...BEAM_REACT_OPTIONS,
    sessionId: 'db9c11f3-F85D-417E-F3F5-8543BC1A1DE1',
    clientOptions: {
      endpointBasePath: 'https://staging-api.crossingminds.com'
    }
  })
  console.log('itemIds', itemIds)

  const productIdsForPurchasedOrViewed = getRandomProductIds(8)
  const {nodes: productForPurchasedOrViewed} = await context.storefront.query<
    Promise<any>
  >(PRODUCTS_QUERY, {
    variables: {
      ids: productIdsForPurchasedOrViewed
    }
  })

  const productIdsForRecommendations = getRandomProductIds(8)
  const {nodes: productForRecommendations} = await context.storefront.query<
    Promise<any>
  >(PRODUCTS_QUERY, {
    variables: {
      ids: productIdsForRecommendations
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
