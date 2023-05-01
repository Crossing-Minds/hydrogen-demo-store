import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'

import {
  recommendationsStyle,
  recommendationsSwiperWrapperStyle,
  recommendationsSwipperStyle,
  recommendationsTitleStyle
} from './Recommendations.css'
import {RecommendationsItem} from './RecommendationsItem'

interface RecommendationsProps {
  productVariants: ProductVariant[]
  title: string
}

export const Recommendations: FunctionComponent<RecommendationsProps> = ({
  productVariants,
  title
}) => {
  return (
    <div className={recommendationsStyle}>
      <h2 className={recommendationsTitleStyle}>{title}</h2>
      <div className={recommendationsSwiperWrapperStyle}>
        <Swiper
          navigation
          modules={[Navigation]}
          slidesPerView={'auto'}
          spaceBetween={8}
          centeredSlides={false}
          className={recommendationsSwipperStyle}
        >
          {productVariants.map(productVariant => (
            <SwiperSlide key={productVariant.id}>
              <RecommendationsItem productVariant={productVariant} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
