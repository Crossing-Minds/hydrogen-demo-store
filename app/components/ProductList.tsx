import type {FunctionComponent} from 'react'

import {Button} from './Button'
import {
  productListFiltersStyle,
  productListGridStyle,
  productListPaginationItemActiveStyle,
  productListPaginationItemStyle,
  productListPaginationStyle,
  productListStyle,
  productListTitleStyle
} from './ProductList.css'
import {ProductListItem} from './ProductListItem'

export const ProductList: FunctionComponent = () => {
  return (
    <div className={productListStyle}>
      <h1 className={productListTitleStyle}>Collection</h1>
      <div className={productListFiltersStyle}>
        <span>Sort by</span>
        <span>Size</span>
        <span>Color</span>
        <span>Product type</span>
      </div>
      <div className={productListGridStyle}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => (
          <ProductListItem key={n} />
        ))}
      </div>
      <ul className={productListPaginationStyle}>
        <li className={productListPaginationItemActiveStyle}>1</li>
        <li className={productListPaginationItemStyle}>2</li>
        <li className={productListPaginationItemStyle}>3</li>
        <li className={productListPaginationItemStyle}>4</li>
        <li className={productListPaginationItemStyle}>...</li>
        <li className={productListPaginationItemStyle}>9</li>
        <li className={productListPaginationItemStyle}>
          <Button
            onClick={() => undefined}
            title="next >"
            variant="pagination"
          />
        </li>
      </ul>
    </div>
  )
}
