import {getPersonalizedRecommendations} from '@crossingminds/beam-react'
import {useLoaderData} from '@remix-run/react'
import type {LoaderArgs, MetaFunction} from '@shopify/remix-oxygen'

import {BEAM_REACT_OPTIONS, getRandomCollectionIds} from '~/beam/config'
import {Collections} from '~/components/Collections'
import {HeroBanner} from '~/components/HeroBanner'
import {NewReleases} from '~/components/NewReleases'
import {OurFavorites} from '~/components/OurFavorites'
import {Recomendations} from '~/components/Recomendations'
import {COLLECTIONS_QUERY} from '~/queries/collection'
import {PRODUCTS_BY_VARIANT_QUERY} from '~/queries/product'

export const meta: MetaFunction = () => {
  return {
    title: 'Hydrogen',
    description: 'A custom storefront powered by Hydrogen'
  }
}

export const loader = async ({context}: LoaderArgs) => {
  const collectionIdsForCollections = getRandomCollectionIds(4)
  const {nodes: collectionsForCollections} = await context.storefront.query<
    Promise<any>
  >(COLLECTIONS_QUERY, {
    variables: {
      ids: collectionIdsForCollections
    }
  })

  const {itemIds: variantIdsForRecommendations} =
    await getPersonalizedRecommendations({
      ...BEAM_REACT_OPTIONS,
      sessionId: 'db9c11f3-F85D-417E-F3F5-8543BC1A1DE1',
      maxResults: 8,
      clientOptions: {
        endpointBasePath: 'https://staging-api.crossingminds.com'
      }
    })

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

  const {itemIds: variantIdsForOurFavorites} =
    await getPersonalizedRecommendations({
      ...BEAM_REACT_OPTIONS,
      sessionId: 'db9c11f3-F85D-417E-F3F5-8543BC1A1DE1',
      maxResults: 6,
      clientOptions: {
        endpointBasePath: 'https://staging-api.crossingminds.com'
      }
    })

  const {nodes: productForOurFavorites} = await context.storefront.query<
    Promise<any>
  >(PRODUCTS_BY_VARIANT_QUERY, {
    variables: {
      ids: variantIdsForOurFavorites.map(
        variantId => `gid://shopify/ProductVariant/${variantId}`
      )
    }
  })

  return {
    productsForRecommendations,
    productForOurFavorites,
    collectionsForCollections,
    collectionsForNewReleases
  }
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
