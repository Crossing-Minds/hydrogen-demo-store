import type {FunctionComponent} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

import type {ProductType} from '~/types/product'

import {
  recomendationsStyle,
  recomendationsSwiperWrapperStyle,
  recomendationsSwipperStyle,
  recomendationsTitleStyle
} from './Recomendations.css'
import {RecomendationsItem} from './RecomendationsItem'

interface RecomendationsProps {
  products: ProductType[]
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
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <RecomendationsItem product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
