import type {Cart} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {useEffect} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

import cartRecommendationsLoadingImage from '~/assets/cart-recommendations-loading.svg'
import {useCartRecommendations} from '~/hooks/useCartRecommendations'

import {
  cartRecomendationsLoadingStyle,
  cartRecomendationsStyle,
  cartRecomendationsSwiperWrapperStyle,
  cartRecomendationsTitleStyle
} from './CartRecomendations.css'
import {CartRecomendationsItem} from './CartRecomendationsItem'

interface CartRecomendationsProps {
  cart: Cart
  title: string
}

export const CartRecomendations: FunctionComponent<CartRecomendationsProps> = ({
  cart,
  title
}) => {
  const {
    cartRecommendations,
    cartRecommendationsLoading,
    updateRecommendations
  } = useCartRecommendations()

  useEffect(() => {
    if (cart && cart.lines) {
      updateRecommendations(cart)
    }
  }, [cart])

  return (
    <div className={cartRecomendationsStyle}>
      <h2 className={cartRecomendationsTitleStyle}>{title}</h2>
      {cartRecommendationsLoading ? (
        <img
          alt="Cart Recommendations Loading Animation"
          className={cartRecomendationsLoadingStyle}
          src={cartRecommendationsLoadingImage}
        />
      ) : (
        <>
          <div className={cartRecomendationsSwiperWrapperStyle}>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={8}
              centeredSlides={false}
            >
              {cartRecommendations.map(product => (
                <SwiperSlide key={product.id}>
                  <CartRecomendationsItem product={product.product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  )
}
