import type {OptimizedInputProperties} from '@crossingminds/beam-react'

export const BEAM_REACT_OPTIONS = {
  databaseId: 'OgvBW9OMPud7QgiNWPM38A',
  password: 'k2NrSAUrNEs7gCdR6h1d',
  serviceLoginId: 'luis_shopify_frontend'
} satisfies OptimizedInputProperties

export const DEMO_PRODUCT_IDS = [
  'gid://shopify/Product/8180568949024',
  'gid://shopify/Product/8180568850720',
  'gid://shopify/Product/8180568752416',
  'gid://shopify/Product/8180568654112',
  'gid://shopify/Product/8180568588576',
  'gid://shopify/Product/8180568555808',
  'gid://shopify/Product/8180568490272',
  'gid://shopify/Product/8180568195360',
  'gid://shopify/Product/8180568031520',
  'gid://shopify/Product/8180567834912',
  'gid://shopify/Product/8180567736608',
  'gid://shopify/Product/8180567605536',
  'gid://shopify/Product/8180567572768',
  'gid://shopify/Product/8180567376160',
  'gid://shopify/Product/8180567310624',
  'gid://shopify/Product/8180567245088',
  'gid://shopify/Product/8180567179552',
  'gid://shopify/Product/8180566982944',
  'gid://shopify/Product/8180566884640',
  'gid://shopify/Product/8180566819104',
  'gid://shopify/Product/8180566786336',
  'gid://shopify/Product/8180566720800',
  'gid://shopify/Product/8180566655264',
  'gid://shopify/Product/8180566622496',
  'gid://shopify/Product/8180566425888',
  'gid://shopify/Product/8180566360352',
  'gid://shopify/Product/8180566196512',
  'gid://shopify/Product/8180566098208',
  'gid://shopify/Product/8180566032672',
  'gid://shopify/Product/8180565737760'
]

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

export const getRandomProductIds = (quantity: number) => {
  const shuffledDemoProductIds = DEMO_PRODUCT_IDS.sort(
    () => 0.5 - Math.random()
  )

  return shuffledDemoProductIds.slice(0, quantity)
}

export const getRandomCollectionIds = (quantity: number) => {
  const shuffledDemoCollectionIds = DEMO_COLLECTION_IDS.sort(
    () => 0.5 - Math.random()
  )

  return shuffledDemoCollectionIds.slice(0, quantity)
}
