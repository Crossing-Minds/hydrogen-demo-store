import type {Collection} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'

import {
  collectionsStyle,
  collectionsSwiperWrapperStyle,
  collectionsSwipperStyle,
  collectionsTitleStyle
} from './Collections.css'
import {CollectionsItem} from './CollectionsItem'

interface CollectionsProps {
  collections: Collection[]
}

export const Collections: FunctionComponent<CollectionsProps> = ({
  collections
}) => {
  return (
    <div className={collectionsStyle}>
      <h2 className={collectionsTitleStyle}>Collections for you</h2>
      <div className={collectionsSwiperWrapperStyle}>
        <Swiper
          navigation
          modules={[Navigation]}
          slidesPerView={'auto'}
          spaceBetween={8}
          centeredSlides={false}
          className={collectionsSwipperStyle}
        >
          {collections.map(collection => (
            <SwiperSlide key={collection.id}>
              <CollectionsItem collection={collection} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
