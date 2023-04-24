import type {CartLineEdge} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'

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
          <button className={CartDrawerLineRemoveButtonStyle}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 5H18" stroke="black" strokeLinecap="round" />
              <path d="M11.5 4H12.5" stroke="black" strokeLinecap="square" />
              <path
                d="M7 8H17V18C17 19.1046 16.1046 20 15 20H9C7.89543 20 7 19.1046 7 18V8Z"
                stroke="black"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
