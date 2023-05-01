import type {OptimizedInputProperties} from '@crossingminds/beam-react'

/** Crossing Minds credentials with the role "frontend" do not need to be kept secret.
 * It's ok to hard code them as part of your app. 
 * Account credentials with roles such as "backend" must be kept secret.
 */
export const BEAM_REACT_OPTIONS = {
  databaseId: 'InIy5LoYEkhiH77KcNwt5g',
  password: 'LOQmIlX0zAQooJyxoq9K', // With a "frontend" role, this is more of an API key than a "password"
  serviceLoginId: 'HMShopifyDemo_shopify_frontend'
} satisfies OptimizedInputProperties
