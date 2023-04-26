import {Await} from '@remix-run/react'
import type {FunctionComponent} from 'react'
import {Suspense} from 'react'

import {HeaderCartQuantityStyle, HeaderCartStyle} from './HeaderCart.css'
import cartIcon from '../../public/cart-icon.svg'

interface HeaderCartProps {
  cart: any
  openDrawer: () => void
}

export const HeaderCart: FunctionComponent<HeaderCartProps> = ({
  cart,
  openDrawer
}) => {
  return (
    <Suspense>
      <Await resolve={cart}>
        {(data: any) => (
          <button className={HeaderCartStyle} onClick={openDrawer}>
            <img alt="Cart Icon" src={cartIcon} width={24} />
            {data?.totalQuantity ? (
              <span className={HeaderCartQuantityStyle}>
                {data?.totalQuantity}
              </span>
            ) : undefined}
          </button>
        )}
      </Await>
    </Suspense>
  )
}
