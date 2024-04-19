import {
  getPersonalizedRecommendations,
  getPropertyRecommendations
} from '@crossingminds/beam-react'
import {useLoaderData} from '@remix-run/react'
import type {LoaderArgs, MetaFunction} from '@shopify/remix-oxygen'
import {json} from '@shopify/remix-oxygen'

import {BEAM_REACT_OPTIONS} from '~/beam/config'
import {Collections} from '~/components/Collections'
import {HeroBanner} from '~/components/HeroBanner'
import {NewReleases} from '~/components/NewReleases'
import {OurFavorites} from '~/components/OurFavorites'
import {Recommendations} from '~/components/Recommendations'
import {COLLECTIONS_QUERY} from '~/queries/collection'
import {PRODUCTS_BY_VARIANT_QUERY} from '~/queries/product'
import {commitSession, getSessionAndSessionId} from '~/sessions'
import {
  RECOMMENDATION_SCENARIOS,
  removeDuplicatedIdsAndGetFirstNth
} from '~/utils/recommendations'

import HeroImage1 from '../../public/hero_banner_1.jpg'
import HeroImage2 from '../../public/hero_banner_2.jpg'
import HeroImage3 from '../../public/hero_banner_3.jpg'

const HERO_IMAGES = [HeroImage1, HeroImage2, HeroImage3]

export const loader = async ({context, request}: LoaderArgs) => {
  const {session, sessionId} = await getSessionAndSessionId(request)

  const collectionRecommendationsPromise = getPropertyRecommendations({
    ...BEAM_REACT_OPTIONS,
    sessionId,
    sessionPropertiesScenario:
      RECOMMENDATION_SCENARIOS.HOME_COLLECTIONS_FOR_YOU,
    propertyName: 'collections',
    maxResults: 6
  })

  const productRecommendationsPromise = getPersonalizedRecommendations({
    ...BEAM_REACT_OPTIONS,
    sessionId,
    sessionScenario: RECOMMENDATION_SCENARIOS.HOME_RECOMMENDATIONS_FOR_YOU,
    maxResults: 8
  })

  const newReleasesRecommendations = getPersonalizedRecommendations({
    ...BEAM_REACT_OPTIONS,
    sessionId,
    sessionScenario: RECOMMENDATION_SCENARIOS.HOME_NEW_RELEASES_FOR_YOU,
    maxResults: 11
  })

  const ourFavoritesRecommendationsPromise = getPersonalizedRecommendations({
    ...BEAM_REACT_OPTIONS,
    sessionId,
    sessionScenario: RECOMMENDATION_SCENARIOS.HOME_OUR_FAVORITES,
    maxResults: 17
  })

  const getCollectionItemRecommendations = async () => {
    const {itemProperties: collectionIdsForCollections} =
      await collectionRecommendationsPromise

    return await context.storefront.query<Promise<any>>(COLLECTIONS_QUERY, {
      variables: {
        ids: collectionIdsForCollections.map(
          collectionId => `gid://shopify/Collection/${collectionId}`
        )
      }
    })
  }

  const getProductItemRecommendations = async () => {
    const {itemIds: variantIdsForRecommendations} =
      await productRecommendationsPromise

    return await context.storefront.query<Promise<any>>(
      PRODUCTS_BY_VARIANT_QUERY,
      {
        variables: {
          ids: variantIdsForRecommendations.map(
            variantId => `gid://shopify/ProductVariant/${variantId}`
          )
        }
      }
    )
  }

  const getNewReleasesItemRecommendations = async () => {
    const {itemIds: variantIdsForNewReleases} = await newReleasesRecommendations
    const {itemIds: variantIdsForRecommendations} =
      await productRecommendationsPromise

    return await context.storefront.query<Promise<any>>(
      PRODUCTS_BY_VARIANT_QUERY,
      {
        variables: {
          ids: removeDuplicatedIdsAndGetFirstNth(
            variantIdsForNewReleases,
            variantIdsForRecommendations,
            3
          ).map(variantId => `gid://shopify/ProductVariant/${variantId}`)
        }
      }
    )
  }

  const getOurFavoritesItemRecommendations = async () => {
    const {itemIds: variantIdsForOurFavorites} =
      await ourFavoritesRecommendationsPromise
    const {itemIds: variantIdsForNewReleases} = await newReleasesRecommendations
    const {itemIds: variantIdsForRecommendations} =
      await productRecommendationsPromise

    return await context.storefront.query<Promise<any>>(
      PRODUCTS_BY_VARIANT_QUERY,
      {
        variables: {
          ids: removeDuplicatedIdsAndGetFirstNth(
            variantIdsForOurFavorites,
            [...variantIdsForNewReleases, ...variantIdsForRecommendations],
            6
          ).map(variantId => `gid://shopify/ProductVariant/${variantId}`)
        }
      }
    )
  }

  const [
    {nodes: collectionsForCollections},
    {nodes: productVariantsForRecommendations},
    {nodes: productVariantsForNewReleases},
    {nodes: productVariantsForOurFavorites}
  ] = await Promise.all([
    getCollectionItemRecommendations(),
    getProductItemRecommendations(),
    getNewReleasesItemRecommendations(),
    getOurFavoritesItemRecommendations()
  ])

  return json(
    {
      backgroundImageUrl: HERO_IMAGES[
        Math.floor(Math.random() * HERO_IMAGES.length)
      ] as string,
      collectionsForCollections: collectionsForCollections.filter(Boolean),
      productVariantsForNewReleases:
        productVariantsForNewReleases.filter(Boolean),
      productVariantsForOurFavorites:
        productVariantsForOurFavorites.filter(Boolean),
      productVariantsForRecommendations:
        productVariantsForRecommendations.filter(Boolean)
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session)
      }
    }
  )
}

export const shouldRevalidate = () => false

export const meta: MetaFunction = () => {
  return {
    title: 'Carrera - Crossing Minds Beam Demo Store',
    description: 'A Crossing Minds demo store'
  }
}

export default function Index() {
  const {
    backgroundImageUrl,
    collectionsForCollections,
    productVariantsForNewReleases,
    productVariantsForOurFavorites,
    productVariantsForRecommendations
  } = useLoaderData<typeof loader>()

  return (
    <div>
      <HeroBanner backgroundImageUrl={backgroundImageUrl} />
      <Collections collections={collectionsForCollections} />
      <Recommendations
        productVariants={productVariantsForRecommendations}
        title="Picked just for you"
      />
      <NewReleases productVariants={productVariantsForNewReleases} />
      <OurFavorites productVariants={productVariantsForOurFavorites} />
    </div>
  )
}
