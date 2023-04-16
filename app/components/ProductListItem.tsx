import type {FunctionComponent} from 'react'

import {
  productListItemImageStyle,
  productListItemNameStyle,
  productListItemPriceStyle,
  productListItemStyle
} from './ProductListItem.css'

export const ProductListItem: FunctionComponent = () => {
  return (
    <div className={productListItemStyle}>
      <div className={productListItemImageStyle} />
      <p className={productListItemNameStyle}>Product name</p>
      <p className={productListItemPriceStyle}>$99.99</p>
    </div>
  )
}
