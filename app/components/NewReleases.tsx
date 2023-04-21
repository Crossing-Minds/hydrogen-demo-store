import type {Collection} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'

import {newReleasesStyle, newReleasesTitleStyle} from './NewReleases.css'
import {NewReleasesItem} from './NewReleasesItem'

interface NewReleasesProps {
  collections: Collection[]
}

export const NewReleases: FunctionComponent<NewReleasesProps> = ({
  collections
}) => {
  return (
    <div className={newReleasesStyle}>
      <p className={newReleasesTitleStyle}>New releases for you</p>
      {collections.map(collection => (
        <NewReleasesItem key={collection.id} collection={collection} />
      ))}
    </div>
  )
}
