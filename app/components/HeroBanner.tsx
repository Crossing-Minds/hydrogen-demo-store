import type {FunctionComponent} from 'react'

import {Button} from './Button'
import {
  heroBannerDescription,
  heroBannerInnerStyle,
  heroBannerStyle,
  heroBannerTitle
} from './HeroBanner.css'

export const HeroBanner: FunctionComponent = () => {
  return (
    <div className={heroBannerStyle}>
      <div className={heroBannerInnerStyle}>
        <p className={heroBannerTitle}>
          Organic cottons
          <br />
          for sensitive skings
        </p>
        <p className={heroBannerDescription}>
          Spring collections are available now
        </p>
        <Button onClick={() => undefined} title="Shop Now" variant="hero" />
      </div>
    </div>
  )
}
