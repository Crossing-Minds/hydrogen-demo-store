import {useFetchers, useMatches} from '@remix-run/react'
import type {FunctionComponent, PropsWithChildren} from 'react'
import {useEffect, useMemo} from 'react'

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
  const fetchers = useFetchers()
  const [root] = useMatches()
  const cart = root?.data?.cart

  const addToCartFetchers = useMemo(() => {
    return fetchers.filter(
      fetcher =>
        fetcher?.submission?.formData?.get('cartAction') === 'ADD_TO_CART'
    )
  }, [fetchers])

  useEffect(() => {
    if (!isOpen && addToCartFetchers.length) {
      openDrawer()
    }
  }, [addToCartFetchers, isOpen, openDrawer])

  useEffect(() => {
    openDrawer()
  }, [])

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
