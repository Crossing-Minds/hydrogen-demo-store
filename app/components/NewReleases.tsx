import type {FunctionComponent} from 'react'

import {newReleasesStyle, newReleasesTitleStyle} from './NewReleases.css'
import {NewReleasesItem} from './NewReleasesItem'

export const NewReleases: FunctionComponent = () => {
  return (
    <div className={newReleasesStyle}>
      <p className={newReleasesTitleStyle}>New releases for you</p>
      <NewReleasesItem />
      <NewReleasesItem />
      <NewReleasesItem />
    </div>
  )
}
