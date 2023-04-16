import type {FunctionComponent} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

import {
  recomendationsStyle,
  recomendationsSwiperWrapperStyle,
  recomendationsSwipperStyle,
  recomendationsTitleStyle
} from './Recomendations.css'
import {RecomendationsItem} from './RecomendationsItem'

interface RecomendationsProps {
  products: number[]
  title: string
}

export const Recomendations: FunctionComponent<RecomendationsProps> = ({
  products,
  title
}) => {
  return (
    <div className={recomendationsStyle}>
      <h2 className={recomendationsTitleStyle}>{title}</h2>
      <div className={recomendationsSwiperWrapperStyle}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={8}
          centeredSlides={false}
          className={recomendationsSwipperStyle}
        >
          {products.map(n => (
            <SwiperSlide key={n}>
              <RecomendationsItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
