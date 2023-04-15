import type {AppLoadContext} from '@shopify/remix-oxygen'

import {CART_QUERY} from '~/queries/cart'

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
