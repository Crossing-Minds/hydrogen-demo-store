import {
  SCENARIO_OMITTED,
  getPersonalizedRecommendations,
  getPropertyRecommendations
} from '@crossingminds/beam-react'
import {useLoaderData} from '@remix-run/react'
import type {LoaderArgs, MetaFunction} from '@shopify/remix-oxygen'
import {json} from '@shopify/remix-oxygen'

import {
  BEAM_REACT_OPTIONS,
  getRandomCollectionIds,
  getRandomProductVariantIds
} from '~/beam/config'
import {Collections} from '~/components/Collections'
import {HeroBanner} from '~/components/HeroBanner'
import {NewReleases} from '~/components/NewReleases'
import {OurFavorites} from '~/components/OurFavorites'
import {Recomendations} from '~/components/Recomendations'
import {COLLECTIONS_QUERY} from '~/queries/collection'
import {PRODUCTS_BY_VARIANT_QUERY} from '~/queries/product'
import {commitSession, getSessionAndSessionId} from '~/sessions'

export const meta: MetaFunction = () => {
  return {
    title: 'Hydrogen',
    description: 'A custom storefront powered by Hydrogen'
  }
}

export const loader = async ({context, request}: LoaderArgs) => {
  const {session, sessionId} = await getSessionAndSessionId(request)

  // TODO: when "collections" property is available, use the following code
  // const {itemProperties: collectionIdsForCollections} =
  //   await getPropertyRecommendations({
  //     ...BEAM_REACT_OPTIONS,
  //     sessionId,
  //     sessionPropertiesScenario: SCENARIO_OMITTED, // TODO: add scenario
  //     propertyName: 'collections',
  //     maxResults: 6,
  //     clientOptions: {
  //       endpointBasePath: 'https://staging-api.crossingminds.com'
  //     }
  //   })

  const collectionIdsForCollections = getRandomCollectionIds(4)

  const {nodes: collectionsForCollections} = await context.storefront.query<
    Promise<any>
  >(COLLECTIONS_QUERY, {
    variables: {
      ids: collectionIdsForCollections
    }
  })

  // TODO: when personalized recommendations are working, use the following code
  // const {itemIds: variantIdsForRecommendations} =
  //   await getPersonalizedRecommendations({
  //     ...BEAM_REACT_OPTIONS,
  //     sessionId,
  //     sessionScenario: SCENARIO_OMITTED,
  //     maxResults: 8
  //   })
  const variantIdsForRecommendations = getRandomProductVariantIds(8)

  const {nodes: productsForRecommendations} = await context.storefront.query<
    Promise<any>
  >(PRODUCTS_BY_VARIANT_QUERY, {
    variables: {
      ids: variantIdsForRecommendations.map(
        variantId => `gid://shopify/ProductVariant/${variantId}`
      )
    }
  })

  const collectionIdsForNewReleases = getRandomCollectionIds(3)
  const {nodes: collectionsForNewReleases} = await context.storefront.query<
    Promise<any>
  >(COLLECTIONS_QUERY, {
    variables: {
      ids: collectionIdsForNewReleases
    }
  })

  // TODO: when personalized recommendations are working, use the following code
  // const {itemIds: variantIdsForOurFavorites} =
  //   await getPersonalizedRecommendations({
  //     ...BEAM_REACT_OPTIONS,
  //     sessionId,
  //     sessionScenario: SCENARIO_OMITTED,
  //     maxResults: 6
  //   })
  const variantIdsForOurFavorites = getRandomProductVariantIds(6)

  const {nodes: productForOurFavorites} = await context.storefront.query<
    Promise<any>
  >(PRODUCTS_BY_VARIANT_QUERY, {
    variables: {
      ids: variantIdsForOurFavorites.map(
        variantId => `gid://shopify/ProductVariant/${variantId}`
      )
    }
  })

  return json(
    {
      productsForRecommendations,
      productForOurFavorites,
      collectionsForCollections,
      collectionsForNewReleases
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session)
      }
    }
  )
}

export default function Index() {
  const {
    collectionsForCollections,
    collectionsForNewReleases,
    productForOurFavorites,
    productsForRecommendations
  } = useLoaderData<typeof loader>()

  return (
    <div>
      <HeroBanner />
      <Collections collections={collectionsForCollections} />
      <Recomendations
        products={productsForRecommendations}
        title="Recommendations for you"
      />
      <NewReleases collections={collectionsForNewReleases} />
      <OurFavorites products={productForOurFavorites} />
    </div>
  )
}
