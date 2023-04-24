import type {AppLoadContext} from '@shopify/remix-oxygen'

import {
  ADD_LINES_MUTATION,
  CART_QUERY,
  CREATE_CART_MUTATION,
  REMOVE_LINE_ITEMS_MUTATION
} from '~/queries/cart'

interface GetCart {
  (context: AppLoadContext, cartId: string): any
}

export const getCart: GetCart = async ({storefront}, cartId) => {
  const {cart} = (await storefront.query(CART_QUERY, {
    variables: {
      cartId,
      country: storefront.i18n.country,
      language: storefront.i18n.language
    },
    cache: storefront.CacheNone()
  })) as any

  return cart
}

export async function cartCreate({input, storefront}) {
  const {cartCreate} = await storefront.mutate(CREATE_CART_MUTATION, {
    variables: {input}
  })

  return cartCreate
}

export async function cartAdd({cartId, lines, storefront}) {
  const {cartLinesAdd} = await storefront.mutate(ADD_LINES_MUTATION, {
    variables: {cartId, lines}
  })

  return cartLinesAdd
}

export async function cartRemove({cartId, lineIds, storefront}) {
  const {cartLinesRemove} = await storefront.mutate(
    REMOVE_LINE_ITEMS_MUTATION,
    {
      variables: {
        cartId,
        lineIds
      }
    }
  )

  if (!cartLinesRemove) {
    throw new Error('No data returned from remove lines mutation')
  }
  return cartLinesRemove
}
