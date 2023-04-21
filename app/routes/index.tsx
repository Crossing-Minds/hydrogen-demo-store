import {useLoaderData} from '@remix-run/react'
import type {LoaderArgs, MetaFunction} from '@shopify/remix-oxygen'

import {getRandomCollectionIds, getRandomProductIds} from '~/beam/config'
import {Collections} from '~/components/Collections'
import {HeroBanner} from '~/components/HeroBanner'
import {NewReleases} from '~/components/NewReleases'
import {OurFavorites} from '~/components/OurFavorites'
import {Recomendations} from '~/components/Recomendations'
import {COLLECTIONS_QUERY} from '~/queries/collection'
import {PRODUCTS_QUERY} from '~/queries/product'

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

  const productIdsForRecommendations = getRandomProductIds(8)
  const {nodes: productsForRecommendations} = await context.storefront.query<
    Promise<any>
  >(PRODUCTS_QUERY, {
    variables: {
      ids: productIdsForRecommendations
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

  const productIdsForOurFavorites = getRandomProductIds(6)
  const {nodes: productForOurFavorites} = await context.storefront.query<
    Promise<any>
  >(PRODUCTS_QUERY, {
    variables: {
      ids: productIdsForOurFavorites
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
