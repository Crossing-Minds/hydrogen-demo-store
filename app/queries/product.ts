export const PRODUCT_QUERY = `#graphql
query product($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
    descriptionHtml
    media(first: 10) {
      nodes {
        ... on MediaImage {
          mediaContentType
          image {
            url
            width
            height
          }
        }
      }
    }
    variants(first: 10) {
      nodes {
        id
        price {
          amount
        }
      }
    }
  }
}
`

export const PRODUCTS_QUERY = `#graphql
query products($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on Product {
      id
      title
      handle
      descriptionHtml
      media(first: 10) {
        nodes {
          ... on MediaImage {
            mediaContentType
            image {
              url
              width
              height
            }
          }
        }
      }
      options {
        name,
        values
      }
      variants(first: 10) {
        nodes {
          id
          price {
            amount
          }
        }
      }
    }
  }
}
`
