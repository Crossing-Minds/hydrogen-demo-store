import type {Image} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'

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

interface ButtonProps {
  product: {
    image: Image
    title: string
    price: string
    description: string
  }
}

export const ProductDetail: FunctionComponent<ButtonProps> = ({product}) => {
  return (
    <div className={productDetailStyle}>
      <div
        className={productDetailImageStyle}
        style={{
          backgroundImage: `url(${product.image.url})`
        }}
      />
      <div className={productDetailWrapperStyle}>
        <h1 className={productDetailTitleStyle}>{product.title}</h1>
        <p className={productDetailPriceStyle}>{product.price}</p>
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
        <p className={productDetailDescriptionStyle}>{product.description}</p>
      </div>
    </div>
  )
}
