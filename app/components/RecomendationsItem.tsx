import type {FunctionComponent} from 'react'

import {Button} from './Button'
import {
  recomendationsItemImageStyle,
  recomendationsItemPricetyles,
  recomendationsItemTitleStyle
} from './RecomendationsItem.css'

export const RecomendationsItem: FunctionComponent = () => {
  return (
    <>
      <div className={recomendationsItemImageStyle}></div>
      <p className={recomendationsItemTitleStyle}>Collection Name</p>
      <p className={recomendationsItemPricetyles}>$99.99</p>
      <Button onClick={() => undefined} title="Add to cart" />
    </>
  )
}
