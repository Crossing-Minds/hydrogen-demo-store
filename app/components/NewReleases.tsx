import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'

import {newReleasesStyle, newReleasesTitleStyle} from './NewReleases.css'
import {NewReleasesItem} from './NewReleasesItem'

interface NewReleasesProps {
  productVariants: ProductVariant[]
}

export const NewReleases: FunctionComponent<NewReleasesProps> = ({
  productVariants
}) => {
  return (
    <div className={newReleasesStyle}>
      <p className={newReleasesTitleStyle}>New releases for you</p>
      {productVariants.map(productVariant => (
        <NewReleasesItem
          key={productVariant.id}
          productVariant={productVariant}
        />
      ))}
    </div>
  )
}
