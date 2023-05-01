import {useFetcher} from '@remix-run/react'
import type {
  Collection as CollectionType,
  ProductVariant
} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {useEffect, useState} from 'react'

import {SHOPIFY_ENTITY_TYPES, getIdFromShopifyEntityId} from '~/utils/shopify'

import {Button} from './Button'
import {
  collectionGridStyle,
  collectionPaginationButtonStyle,
  collectionPaginationItemStyle,
  collectionPaginationStyle,
  collectionStyle,
  collectionTitleStyle
} from './Collection.css'
import {CollectionProduct} from './CollectionProduct'

interface CollectionProps {
  collection: CollectionType
  initialNextCursor: string | undefined
  initialProductVariants: ProductVariant[]
}

export const Collection: FunctionComponent<CollectionProps> = ({
  collection,
  initialNextCursor,
  initialProductVariants
}) => {
  const fetcher = useFetcher()
  const [nextCursor, setNextCursor] = useState(initialNextCursor)
  const [productVariants, setProductVariants] = useState(initialProductVariants)

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      setNextCursor(fetcher.data.nextCursor)
      setProductVariants(fetcher.data.productVariants)
    }
  }, [fetcher])

  const loadNextPage = () => {
    if (nextCursor) {
      fetcher.submit(
        {
          collectionId: getIdFromShopifyEntityId(
            SHOPIFY_ENTITY_TYPES.COLLECTION,
            collection.id
          ),
          nextCursor
        },
        {method: 'post', action: `/collections/${collection.handle}`}
      )
    }
  }

  return (
    <div className={collectionStyle}>
      <h1 className={collectionTitleStyle}>{collection.title}</h1>
      <div className={collectionGridStyle}>
        {productVariants.map(productVariant => (
          <CollectionProduct
            key={productVariant.id}
            productVariant={productVariant}
          />
        ))}
      </div>
      <ul className={collectionPaginationStyle}>
        <li className={collectionPaginationItemStyle}>
          <Button
            className={collectionPaginationButtonStyle}
            disabled={!nextCursor}
            loading={fetcher.state === 'loading'}
            onClick={loadNextPage}
            title="Next >"
            variant="pagination"
          />
        </li>
      </ul>
    </div>
  )
}
