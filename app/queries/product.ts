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

export const PRODUCTS_BY_VARIANT_QUERY = `#graphql
query variantProducts($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on ProductVariant {
      id
      product {
        id
        descriptionHtml
        handle
        media(first: 1) {
          nodes {
            ... on MediaImage {
              image {
                height
                url
                width
              }
            }
          }
        }
        variants(first: 1) {
          nodes {
            id
            price {
              amount
            }
          }
        }
        title
      }
    }
  }
}
`
