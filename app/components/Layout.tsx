import {useMatches} from '@remix-run/react'
import type {FunctionComponent, PropsWithChildren} from 'react'
import {useEffect, useState} from 'react'

import {useCartFetchers} from '~/hooks/useCartFetchers'

import {CartDrawer} from './CartDrawer'
import {Drawer, useDrawer} from './Drawer'
import {Footer} from './Footer'
import {Header} from './Header'
import {
  layoutContentWrapperStyle,
  layoutFooterWrapperStyle,
  layoutStyle
} from './Layout.css'

export const Layout: FunctionComponent<PropsWithChildren<object>> = ({
  children
}) => {
  const {closeDrawer, isOpen, openDrawer} = useDrawer()
  const [root] = useMatches()
  const cart = root?.data?.cart

  const addToCartFetchers = useCartFetchers('ADD_TO_CART')
  const [activeAddToCartFetchersCount, setActiveAddToCartFetchersCount] =
    useState(0)

  useEffect(() => {
    if (
      !isOpen &&
      !addToCartFetchers.length &&
      activeAddToCartFetchersCount === 1
    ) {
      openDrawer()
      setActiveAddToCartFetchersCount(0)
    } else {
      setActiveAddToCartFetchersCount(addToCartFetchers.length)
    }
  }, [addToCartFetchers, activeAddToCartFetchersCount, isOpen, openDrawer])

  return (
    <div className={layoutStyle}>
      <div className={layoutContentWrapperStyle}>
        <Header openDrawer={openDrawer} />
        <main role="main" id="mainContent">
          {children}
        </main>
        <Drawer
          close={closeDrawer}
          open={isOpen}
          onClose={closeDrawer}
          title="Your cart"
        >
          <CartDrawer cart={cart} close={closeDrawer} />
        </Drawer>
      </div>
      <div className={layoutFooterWrapperStyle}>
        <Footer />
      </div>
    </div>
  )
}
