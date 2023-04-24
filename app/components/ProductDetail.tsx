import type {FunctionComponent} from 'react'

import type {ProductType} from '~/types/product'

import {Button} from './Button'
import {
  productDetailAttributeStyle,
  productDetailCTAsStyle,
  productDetailDescriptionStyle,
  productDetailImageStyle,
  productDetailPriceStyle,
  productDetailStyle,
  productDetailTitleStyle,
  productDetailWrapperStyle
} from './ProductDetail.css'
import {ProductImage} from './ProductImage'

interface ButtonProps {
  product: ProductType
}

export const ProductDetail: FunctionComponent<ButtonProps> = ({product}) => {
  return (
    <div className={productDetailStyle}>
      <ProductImage className={productDetailImageStyle} product={product} />
      <div className={productDetailWrapperStyle}>
        <h1 className={productDetailTitleStyle}>{product.title}</h1>
        <p className={productDetailPriceStyle}>
          ${product.variants.nodes[0]?.price.amount}
        </p>
        <p className={productDetailAttributeStyle}>Color: White</p>
        <p className={productDetailAttributeStyle}>Size: M</p>
        <div>
          <p className={productDetailAttributeStyle}>Quantity</p>
        </div>
        <div className={productDetailCTAsStyle}>
          <Button
            onClick={() => undefined}
            title="Add to cart"
            variant="outlined"
          />
          <Button onClick={() => undefined} title="Buy it now" />
        </div>
        <div
          className={productDetailDescriptionStyle}
          dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
        />
      </div>
    </div>
  )
}
