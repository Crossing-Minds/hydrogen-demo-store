import {type LoaderArgs, json} from '@shopify/remix-oxygen'

import {PRODUCTS_BY_VARIANT_QUERY} from '~/queries/product'

export async function action({request, context}: LoaderArgs) {
  const [formData] = await Promise.all([request.formData()])
  let itemIds: string[] = []

  try {
    itemIds = JSON.parse((formData.get('itemIds') as string) || '') as string[]
  } catch {
    return json({nodes: []})
  }

  const {nodes} = await context.storefront.query<Promise<any>>(
    PRODUCTS_BY_VARIANT_QUERY,
    {
      variables: {
        ids: (itemIds as string[]).map(
          itemId => `gid://shopify/ProductVariant/${itemId}`
        )
      }
    }
  )

  return json(nodes)
}

export default function CartRecommendations() {
  return <p>Cart Recommendations</p>
}
