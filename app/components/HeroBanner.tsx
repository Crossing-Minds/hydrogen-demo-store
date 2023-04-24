import type {FunctionComponent} from 'react'

import {Button} from './Button'
import {
  heroBannerDescription,
  heroBannerInnerStyle,
  heroBannerStyle,
  heroBannerTitle
} from './HeroBanner.css'
import HeroImage1 from '../../public/hero_banner_1.jpg'
import HeroImage2 from '../../public/hero_banner_2.jpg'
import HeroImage3 from '../../public/hero_banner_3.jpg'

const HERO_IMAGES = [HeroImage1, HeroImage2, HeroImage3]

export const HeroBanner: FunctionComponent = () => {
  return (
    <div
      className={heroBannerStyle}
      style={{
        backgroundImage: `url(${
          HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)]
        })`
      }}
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
        <Button title="Shop Now" variant="hero" />
      </div>
    </div>
  )
}
