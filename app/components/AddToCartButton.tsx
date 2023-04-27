import classNames from 'classnames'
import type {FunctionComponent} from 'react'

import {useCartFetchers} from '~/hooks/useCartFetchers'

import {buttonLoaderStyle, buttonLoadingStyle, buttonStyle} from './Button.css'

interface ButtonProps {
  className?: string
  productVariant: string
}

export const AddToCartButton: FunctionComponent<ButtonProps> = ({
  className,
  productVariant
}) => {
  const [productVariantFetcher] = useCartFetchers('ADD_TO_CART', productVariant)
  const loading =
    productVariantFetcher?.state === 'submitting' ||
    productVariantFetcher?.state === 'loading'

  return (
    <button
      className={classNames(
        buttonStyle.primary,
        {
          [buttonLoadingStyle]: loading
        },
        className
      )}
      disabled={loading}
    >
      {loading ? <span className={buttonLoaderStyle} /> : 'Add to cart'}
    </button>
  )
}
