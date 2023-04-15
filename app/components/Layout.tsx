import type {FunctionComponent, PropsWithChildren} from 'react'

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
  return (
    <div className={layoutStyle}>
      <div className={layoutContentWrapperStyle}>
        <Header />
        <main role="main" id="mainContent">
          {children}
        </main>
      </div>
      <div className={layoutFooterWrapperStyle}>
        <Footer />
      </div>
    </div>
  )
}
