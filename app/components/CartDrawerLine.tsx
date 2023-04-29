import {useFetcher} from '@remix-run/react'
import type {CartLineEdge} from '@shopify/hydrogen/storefront-api-types'
import classNames from 'classnames'
import type {FunctionComponent} from 'react'
import {useMemo} from 'react'

import iconDelete from '~/assets/icon-delete.svg'
import {useCartFetchers} from '~/hooks/useCartFetchers'

import {
  CartDrawerDeletingLineStyle,
  CartDrawerLineActionsWrapperStyle,
  CartDrawerLineButtonLoaderStyle,
  CartDrawerLineImageStyle,
  CartDrawerLineInfoStyle,
  CartDrawerLineInfoWrapperStyle,
  CartDrawerLineRemoveButtonStyle,
  CartDrawerLineStyle
} from './CartDrawerLine.css'
import {ProductImage} from './ProductImage'

interface HeaderProps {
  cartLineEdge: CartLineEdge
}

export const CartDrawerLine: FunctionComponent<HeaderProps> = ({
  cartLineEdge
}) => {
  const fetcher = useFetcher()
  const removeFromCartFetchers = useCartFetchers('REMOVE_FROM_CART')
  const isDeletingLine = useMemo(() => {
    return !!removeFromCartFetchers.find(removeFromCartFetcher => {
      let linesIds: string[] = []

      try {
        linesIds = JSON.parse(
          String(removeFromCartFetcher.formData?.get('linesIds'))
        )
      } catch {
        return false
      }

      return (
        (removeFromCartFetcher.state === 'submitting' ||
          removeFromCartFetcher.state === 'loading') &&
        linesIds[0] === cartLineEdge.node.id
      )
    })
  }, [removeFromCartFetchers])

  return (
    <div
      className={classNames(CartDrawerLineStyle, {
        [CartDrawerDeletingLineStyle]: isDeletingLine
      })}
    >
      <ProductImage
        cartLineEdge={cartLineEdge}
        className={CartDrawerLineImageStyle}
      />
      <div className={CartDrawerLineInfoWrapperStyle}>
        <div className={CartDrawerLineInfoStyle}>
          <p>{cartLineEdge.node.merchandise.product.title}</p>
          <p>${cartLineEdge.node.merchandise.price.amount}</p>
        </div>
        <div className={CartDrawerLineActionsWrapperStyle}>
          <p>Qty: {cartLineEdge.node.quantity}</p>
          <fetcher.Form action="/" method="post">
            <input type="hidden" name="cartAction" value="REMOVE_FROM_CART" />
            <input
              type="hidden"
              name="linesIds"
              value={JSON.stringify([cartLineEdge.node.id])}
            />
            <button
              className={CartDrawerLineRemoveButtonStyle}
              disabled={isDeletingLine}
            >
              {isDeletingLine ? (
                <span className={CartDrawerLineButtonLoaderStyle} />
              ) : (
                <img alt="Delete icon" src={iconDelete} />
              )}
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  )
}
