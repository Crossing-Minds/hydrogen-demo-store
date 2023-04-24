import {Await} from '@remix-run/react'
import type {Cart} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {Suspense} from 'react'

import {Button} from './Button'
import {
  CartDrawerInfoStyle,
  CartDrawerProductsStyle,
  CartDrawerRecommendationsStyle,
  CartDrawerStyle,
  CartDrawerSubtotalStyle
} from './CartDrawer.css'
import {CartDrawerLine} from './CartDrawerLine'

interface HeaderProps {
  cart: Cart
  close: () => void
}

export const CartDrawer: FunctionComponent<HeaderProps> = ({cart, close}) => {
  return (
    <Suspense>
      <Await resolve={cart}>
        {data => (
          <div className={CartDrawerStyle}>
            <div className={CartDrawerInfoStyle}>
              <p>Subtotal</p>
              <p className={CartDrawerSubtotalStyle}>
                ${data.cost.subtotalAmount.amount} USD
              </p>
              <Button onClick={close} title="Checkout now" />
              <Button
                onClick={close}
                title="Continue shopping"
                variant="outlined"
              />
            </div>
            <div className={CartDrawerProductsStyle}>
              {data.lines.edges.map(lineEdge => (
                <CartDrawerLine
                  key={lineEdge.node.id}
                  cartLineEdge={lineEdge}
                />
              ))}
            </div>
            <div className={CartDrawerRecommendationsStyle}></div>
          </div>
        )}
      </Await>
    </Suspense>
  )
}
