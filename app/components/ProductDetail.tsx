import {useFetcher, useMatches} from '@remix-run/react'
import type {Product} from '@shopify/hydrogen/storefront-api-types'
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
import {ProductImage} from './ProductImage'

interface ButtonProps {
  product: Product
}

export const ProductDetail: FunctionComponent<ButtonProps> = ({product}) => {
  const [root] = useMatches()
  const selectedLocale = root?.data?.selectedLocale
  const fetcher = useFetcher()
  const lines = [{merchandiseId: product.variants.nodes[0]?.id, quantity: 1}]

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
          <fetcher.Form action="/" method="post">
            <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
            <input
              type="hidden"
              name="countryCode"
              value={selectedLocale?.country ?? 'US'}
            />
            <input type="hidden" name="lines" value={JSON.stringify(lines)} />
            <Button title="Add to cart" variant="outlined" />
          </fetcher.Form>
          <fetcher.Form action="/" method="post">
            <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
            <input
              type="hidden"
              name="countryCode"
              value={selectedLocale?.country ?? 'US'}
            />
            <input type="hidden" name="lines" value={JSON.stringify(lines)} />
            <Button title="Buy it now" />
          </fetcher.Form>
        </div>
        <div
          className={productDetailDescriptionStyle}
          dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
        />
      </div>
    </div>
  )
}
