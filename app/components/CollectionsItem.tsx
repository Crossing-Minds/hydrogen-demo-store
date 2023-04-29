import type {Collection} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'

import {
  collectionsItemImageStyle,
  collectionsItemTitleStyle
} from './CollectionsItem.css'

interface CollectionsItemProps {
  collection: Collection
}

export const CollectionsItem: FunctionComponent<CollectionsItemProps> = ({
  collection
}) => {
  return (
    <a href={`/collections/${collection.handle}`}>
      <div
        className={collectionsItemImageStyle}
        style={{
          backgroundImage: `url(${collection.image?.url})`
        }}
      ></div>
      <p className={collectionsItemTitleStyle}>{collection.title}</p>
    </a>
  )
}
