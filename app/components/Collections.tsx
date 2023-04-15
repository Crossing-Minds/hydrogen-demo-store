import type {FunctionComponent} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

import {
  collectionsStyle,
  collectionsSwiperWrapperStyle,
  collectionsSwipperStyle,
  collectionsTitleStyle
} from './Collections.css'
import {CollectionsItem} from './CollectionsItem'

export const Collections: FunctionComponent = () => {
  return (
    <div className={collectionsStyle}>
      <h2 className={collectionsTitleStyle}>Collections for you</h2>
      <div className={collectionsSwiperWrapperStyle}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={8}
          centeredSlides={false}
          className={collectionsSwipperStyle}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map(n => (
            <SwiperSlide key={n}>
              <CollectionsItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
