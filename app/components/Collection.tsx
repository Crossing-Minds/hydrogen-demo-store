import {useFetcher} from '@remix-run/react'
import type {Collection as CollectionType} from '@shopify/hydrogen/storefront-api-types'
import type {FunctionComponent} from 'react'
import {useEffect, useState} from 'react'

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
}

export const Collection: FunctionComponent<CollectionProps> = ({
  collection
}) => {
  const fetcher = useFetcher()
  const [products, setProducts] = useState(collection.products)
  const {
    pageInfo: {hasNextPage, hasPreviousPage, endCursor, startCursor}
  } = products

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      setProducts(fetcher.data)
    }
  }, [fetcher])

  const loadNextPage = () => {
    fetcher.submit(
      {
        pageInfo: JSON.stringify({
          first: 12,
          startCursor: endCursor
        })
      },
      {method: 'post', action: `/collections/${collection.handle}`}
    )
  }

  const loadPreviousPage = () => {
    fetcher.submit(
      {
        pageInfo: JSON.stringify({
          last: 12,
          endCursor: startCursor
        })
      },
      {method: 'post', action: `/collections/${collection.handle}`}
    )
  }

  return (
    <div className={collectionStyle}>
      <h1 className={collectionTitleStyle}>Collection</h1>
      <div className={collectionGridStyle}>
        {products.nodes.map(product => (
          <CollectionProduct key={product.id} product={product} />
        ))}
      </div>
      <ul className={collectionPaginationStyle}>
        <li className={collectionPaginationItemStyle}>
          <Button
            className={collectionPaginationButtonStyle}
            disabled={!hasPreviousPage}
            loading={fetcher.state === 'loading'}
            onClick={loadPreviousPage}
            title="< Previous"
            variant="pagination"
          />
        </li>
        <li className={collectionPaginationItemStyle}>
          <Button
            className={collectionPaginationButtonStyle}
            disabled={!hasNextPage}
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
