import type {OptimizedInputProperties} from '@crossingminds/beam-react'

export const BEAM_REACT_OPTIONS = {
  databaseId: 'OgvBW9OMPud7QgiNWPM38A',
  password: 'k2NrSAUrNEs7gCdR6h1d',
  serviceLoginId: 'luis_shopify_frontend'
} satisfies OptimizedInputProperties

export const DEMO_COLLECTION_IDS = [
  'gid://shopify/Collection/442762232096',
  'gid://shopify/Collection/442762264864',
  'gid://shopify/Collection/442762297632',
  'gid://shopify/Collection/442762330400',
  'gid://shopify/Collection/442762363168',
  'gid://shopify/Collection/442762428704',
  'gid://shopify/Collection/442762494240',
  'gid://shopify/Collection/442762527008'
]

export const getRandomCollectionIds = (quantity: number) => {
  const shuffledDemoCollectionIds = DEMO_COLLECTION_IDS.sort(
    () => 0.5 - Math.random()
  )

  return shuffledDemoCollectionIds.slice(0, quantity)
}
