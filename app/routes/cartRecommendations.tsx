import {type LoaderArgs, json, redirect} from '@shopify/remix-oxygen'

import {PRODUCTS_BY_VARIANT_QUERY} from '~/queries/product'
import {getShopifyEntityIdFromId} from '~/utils/shopify'

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
        ids: (itemIds as string[]).map(itemId =>
          getShopifyEntityIdFromId('ProductVariant', itemId)
        )
      }
    }
  )

  return json(nodes)
}

export const loader = async () => {
  return redirect('/')
}

export default function CartRecommendations() {
  return <></>
}
