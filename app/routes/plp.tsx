import type {MetaFunction} from '@shopify/remix-oxygen'

import {ProductList} from '~/components/ProductList'

export const meta: MetaFunction = () => {
  return {
    title: 'Product List Page',
    description: 'A description of the product list page'
  }
}

export default function Index() {
  return <ProductList />
}
