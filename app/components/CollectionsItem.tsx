import type {FunctionComponent} from 'react'

import {
  collectionsItemImageStyle,
  collectionsItemTitleStyle
} from './CollectionsItem.css'

export const CollectionsItem: FunctionComponent = () => {
  return (
    <>
      <div className={collectionsItemImageStyle}></div>
      <p className={collectionsItemTitleStyle}>Collection Name</p>
    </>
  )
}
