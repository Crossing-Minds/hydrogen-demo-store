import type {FunctionComponent} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

import {
  recomendationsStyle,
  recomendationsSwiperWrapperStyle,
  recomendationsSwipperStyle,
  recomendationsTitleStyle
} from './Recomendations.css'
import {RecomendationsItem} from './RecomendationsItem'

export const Recomendations: FunctionComponent = () => {
  return (
    <div className={recomendationsStyle}>
      <h2 className={recomendationsTitleStyle}>Recomendations for you</h2>
      <div className={recomendationsSwiperWrapperStyle}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={8}
          centeredSlides={false}
          className={recomendationsSwipperStyle}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <SwiperSlide key={n}>
              <RecomendationsItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
