import type {MetaFunction} from '@shopify/remix-oxygen'

import {ProductDetail} from '~/components/ProductDetail'
import {Recomendations} from '~/components/Recomendations'

export const meta: MetaFunction = () => {
  return {
    title: 'Product Page',
    description: 'A description of the product'
  }
}

export default function Index() {
  return (
    <div>
      <ProductDetail
        product={{
          description:
            'Cropped sports top in supersoft sweatshirt fabric made from fast-drying functional fabric with a double-layered drawstring hood, long raglan sleeves and ribbing at the cuffs and hem.',
          image: {
            originalSrc:
              'https://cdn.shopify.com/s/files/1/0746/4196/5373/products/0750665001.jpg',
            src: 'https://cdn.shopify.com/s/files/1/0746/4196/5373/products/0750665001.jpg',
            transformedSrc:
              'https://cdn.shopify.com/s/files/1/0746/4196/5373/products/0750665001.jpg',
            url: 'https://cdn.shopify.com/s/files/1/0746/4196/5373/products/0750665001.jpg'
          },
          price: '$99.99',
          title: 'Product name'
        }}
      />
      <Recomendations
        products={[0, 1, 2, 3, 4, 5, 6, 7]}
        title="Customers also purchased or viewed"
      />
      <Recomendations
        products={[0, 1, 2, 3, 4, 5, 6, 7]}
        title="Recommendations for you"
      />
    </div>
  )
}
