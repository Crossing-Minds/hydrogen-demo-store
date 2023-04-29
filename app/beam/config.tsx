import type {OptimizedInputProperties} from '@crossingminds/beam-react'

export const BEAM_REACT_OPTIONS = {
  databaseId: 'InIy5LoYEkhiH77KcNwt5g',
  password: 'LOQmIlX0zAQooJyxoq9K',
  serviceLoginId: 'HMShopifyDemo_shopify_frontend'
} satisfies OptimizedInputProperties

export const DEMO_PRODUCT_IDS = [
  '45007081898301',
  '45007082062141',
  '45007082619197',
  '45007082783037',
  '45007087862077',
  '45007090450749',
  '45007090975037',
  '45007091368253',
  '45007092220221',
  '45007092351293',
  '45007095005501',
  '45007104901437',
  '45007107227965',
  '45007107948861',
  '45007108735293',
  '45007109161277',
  '45007109554493',
  '45007109685565',
  '45007110177085',
  '45007110766909'
]

export const DEMO_COLLECTION_IDS = [
  'gid://shopify/Collection/445257122109',
  'gid://shopify/Collection/446019731773',
  'gid://shopify/Collection/445257285949',
  'gid://shopify/Collection/446021894461',
  'gid://shopify/Collection/446018584893',
  'gid://shopify/Collection/446013833533',
  'gid://shopify/Collection/445257318717',
  'gid://shopify/Collection/445257154877'
]

export const getRandomCollectionIds = (quantity: number) => {
  const shuffledDemoCollectionIds = DEMO_COLLECTION_IDS.sort(
    () => 0.5 - Math.random()
  )

  return shuffledDemoCollectionIds.slice(0, quantity)
}

export const getRandomProductVariantIds = (quantity: number) => {
  const shuffledDemoProductIds = DEMO_PRODUCT_IDS.sort(
    () => 0.5 - Math.random()
  )

  return shuffledDemoProductIds.slice(0, quantity)
}
