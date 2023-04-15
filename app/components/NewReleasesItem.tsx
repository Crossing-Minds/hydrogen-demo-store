import type {FunctionComponent} from 'react'

import {
  newReleasesItemStyle,
  newReleasesItemTitleStyle
} from './NewReleasesItem.css'

export const NewReleasesItem: FunctionComponent = () => {
  return (
    <div className={newReleasesItemStyle}>
      <p className={newReleasesItemTitleStyle}>NAME</p>
    </div>
  )
}
