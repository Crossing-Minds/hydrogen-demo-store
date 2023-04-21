import type {Collection} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'

import {
  newReleasesItemStyle,
  newReleasesItemTitleStyle
} from './NewReleasesItem.css'

interface NewReleasesItemProps {
  collection: Collection
}

export const NewReleasesItem: FunctionComponent<NewReleasesItemProps> = ({
  collection
}) => {
  return (
    <div
      className={newReleasesItemStyle}
      style={{
        backgroundImage: `url(${collection.image?.url})`
      }}
    >
      <p className={newReleasesItemTitleStyle}>{collection.title}</p>
    </div>
  )
}
