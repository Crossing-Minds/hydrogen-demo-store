export const PRODUCTS_BY_VARIANT_QUERY = `#graphql
query variantProducts($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on ProductVariant {
      id
      image {
        height
        url
        width
      }
      price {
        amount
      }
      product {
        id
        descriptionHtml
        handle
        title
      }
      title
    }
  }
}
`

export const PRODUCT_BY_VARIANT_QUERY = `#graphql
query variantProduct($id: ID!) {
  node(id: $id) {
    ... on ProductVariant {
      id
      image {
        height
        url
        width
      }
      price {
        amount
      }
      product {
        id
        descriptionHtml
        handle
        tags
        title
      }
      title
    }
  }
}
`
