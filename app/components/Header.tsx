import {useMatches} from '@remix-run/react'
import type {FunctionComponent} from 'react'

import {headerInnerStyle, headerStyle, headerTitleStyle} from './Header.css'
import {HeaderCart} from './HeaderCart'

export const Header: FunctionComponent = () => {
  const [root] = useMatches()
  const cart: any = root?.data?.cart

  return (
    <header className={headerStyle}>
      <div className={headerInnerStyle}>
        <h1 className={headerTitleStyle}>Carrera</h1>
        <HeaderCart cart={cart} />
      </div>
    </header>
  )
}
