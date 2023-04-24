import type {Product} from '@shopify/hydrogen/storefront-api-types'
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
  products: {
    id: string
    product: Product
  }[]
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
              <RecomendationsItem product={product.product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
