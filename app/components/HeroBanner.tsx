import type {FunctionComponent} from 'react'

import {
  heroBannerDescription,
  heroBannerInnerStyle,
  heroBannerStyle,
  heroBannerTitle
} from './HeroBanner.css'

interface HeroBannerProps {
  backgroundImageUrl: string
}

export const HeroBanner: FunctionComponent<HeroBannerProps> = ({
  backgroundImageUrl
}) => {
  return (
    <div
      className={heroBannerStyle}
      style={{backgroundImage: `url(${backgroundImageUrl})`}}
    >
      <div className={heroBannerInnerStyle}>
        <p className={heroBannerTitle}>
          Organic cottons
          <br />
          for sensitive skins
        </p>
        <p className={heroBannerDescription}>
          Spring collections are available now
        </p>
      </div>
    </div>
  )
}
