import type {FunctionComponent} from 'react'

import {
  footerCategoryStyle,
  footerGroupStyle,
  footerLinkStyle,
  footerStyle,
  footerWrapperStyle
} from './Footer.css'

export const Footer: FunctionComponent = () => {
  return (
    <div className={footerStyle}>
      <div className={footerWrapperStyle}>
        <div className={footerGroupStyle}>
          <p className={footerCategoryStyle}>Shopping</p>
          <a className={footerLinkStyle} href="/">
            Women
          </a>
          <a className={footerLinkStyle} href="/">
            Men
          </a>
        </div>
        <div className={footerGroupStyle}>
          <p className={footerCategoryStyle}>Company</p>
          <a className={footerLinkStyle} href="/">
            Careers
          </a>
          <a className={footerLinkStyle} href="/">
            Blog
          </a>
        </div>
        <div className={footerGroupStyle}>
          <p className={footerCategoryStyle}>Support</p>
          <a className={footerLinkStyle} href="/">
            Help Center
          </a>
          <a className={footerLinkStyle} href="/">
            Contact us
          </a>
        </div>
      </div>
    </div>
  )
}
