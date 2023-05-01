import type {Cart} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {useEffect} from 'react'
import {Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'

import cartRecommendationsLoadingImage from '~/assets/cart-recommendations-loading.svg'
import {useCartRecommendations} from '~/hooks/useCartRecommendations'

import {
  cartRecommendationsLoadingStyle,
  cartRecommendationsStyle,
  cartRecommendationsSwiperWrapperStyle,
  cartRecommendationsTitleStyle
} from './CartRecommendations.css'
import {CartRecommendationsItem} from './CartRecommendationsItem'

interface CartRecommendationsProps {
  cart: Cart
  title: string
}

export const CartRecommendations: FunctionComponent<
  CartRecommendationsProps
> = ({cart, title}) => {
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

  return cart?.lines?.edges.length ? (
    <div className={cartRecommendationsStyle}>
      <h2 className={cartRecommendationsTitleStyle}>{title}</h2>
      {cartRecommendationsLoading ? (
        <img
          alt="Cart Recommendations Loading Animation"
          className={cartRecommendationsLoadingStyle}
          src={cartRecommendationsLoadingImage}
        />
      ) : (
        <>
          <div className={cartRecommendationsSwiperWrapperStyle}>
            <Swiper
              navigation
              modules={[Navigation]}
              slidesPerView={'auto'}
              spaceBetween={8}
              centeredSlides={false}
            >
              {cartRecommendations.map(productVariant => (
                <SwiperSlide key={productVariant.id}>
                  <CartRecommendationsItem productVariant={productVariant} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  ) : undefined
}
