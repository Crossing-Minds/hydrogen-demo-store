import {useFetcher} from '@remix-run/react'
import type {CartLineEdge} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'

import iconDelete from '~/assets/icon-delete.svg'

import {
  CartDrawerLineActionsWrapperStyle,
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

  return (
    <div className={CartDrawerLineStyle}>
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
          <fetcher.Form action="/cart" method="post">
            <input type="hidden" name="cartAction" value="REMOVE_FROM_CART" />
            <input
              type="hidden"
              name="linesIds"
              value={JSON.stringify([cartLineEdge.node.id])}
            />
            <button className={CartDrawerLineRemoveButtonStyle}>
              <img alt="Delete icon" src={iconDelete} />
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  )
}
