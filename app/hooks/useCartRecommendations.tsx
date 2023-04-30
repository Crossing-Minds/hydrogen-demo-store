import {
  SCENARIO_OMITTED,
  getPersonalizedRecommendations
} from '@crossingminds/beam-react'
import {useFetcher} from '@remix-run/react'
import type {Cart} from '@shopify/hydrogen/storefront-api-types'
import cookies from 'js-cookie'
import {useEffect, useMemo, useState} from 'react'

import {BEAM_REACT_OPTIONS} from '~/beam/config'
import {SHOPIFY_ENTITY_TYPES, getIdFromShopifyEntityId} from '~/utils/shopify'

export function useCartRecommendations() {
  const fetcher = useFetcher()
  const [previousCart, setPreviousCart] = useState<Cart | undefined>()
  const [cartRecommendations, setCartRecommendations] = useState<any[]>([])
  const [cartRecommendationsError, setCartRecommendationsError] =
    useState(false)
  const [cartRecommendationsLoading, setCartRecommendationsLoading] =
    useState(false)

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      setCartRecommendations(fetcher.data)
      setCartRecommendationsLoading(false)
      setCartRecommendationsError(false)
    }
  }, [fetcher])

  const sessionId = useMemo(() => {
    const base64EncodedObject = cookies.get('__session')

    if (base64EncodedObject && 'atob' in globalThis) {
      try {
        const decodedObject = atob(base64EncodedObject)
        const {id} = JSON.parse(decodedObject)

        return id
      } catch {
        return undefined
      }
    }
  }, [])

  const cartHasChanged = (newCart: Cart) => {
    return (
      JSON.stringify(newCart.lines) !==
      JSON.stringify(previousCart?.lines || {})
    )
  }

  const updateRecommendations = async (cart: Cart) => {
    if (cartHasChanged(cart)) {
      setCartRecommendationsLoading(true)
      setCartRecommendationsError(false)
      setPreviousCart(cart)

      try {
        const contextItems = cart.lines.edges.map(lineEdge => {
          return {
            itemId: getIdFromShopifyEntityId(
              SHOPIFY_ENTITY_TYPES.PRODUCT_VARIANT,
              lineEdge.node.merchandise.id
            )
          }
        })

        const {itemIds} = await getPersonalizedRecommendations({
          ...BEAM_REACT_OPTIONS,
          sessionId,
          contextItems,
          sessionWithContextScenario: SCENARIO_OMITTED, // TODO: add scenario name
          sessionScenario: SCENARIO_OMITTED, // TODO: add scenario name
          maxResults: 8
        })

        fetcher.submit(
          {itemIds: JSON.stringify(itemIds)},
          {method: 'post', action: '/cartRecommendations'}
        )
      } catch (error) {
        console.error(error)
        setCartRecommendationsError(true)
        setCartRecommendationsLoading(false)
      }
    }
  }

  return {
    cartRecommendations,
    cartRecommendationsError,
    cartRecommendationsLoading,
    updateRecommendations
  }
}
