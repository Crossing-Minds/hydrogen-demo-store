export const PRODUCT_QUERY = `#graphql
query product($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
    vendor
    descriptionHtml
    media(first: 10) {
      nodes {
        ... on MediaImage {
          mediaContentType
          image {
            id
            url
            altText
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
      vendor
      descriptionHtml
      media(first: 10) {
        nodes {
          ... on MediaImage {
            mediaContentType
            image {
              id
              url
              altText
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
          price {
            amount
          }
        }
      }
    }
  }
}
`
