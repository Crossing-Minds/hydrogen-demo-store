export const COLLECTIONS_QUERY = `#graphql
query collections($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on Collection {
      id
      handle
      title
      image {
        url
      }
    }
  }
}
`

export const COLLECTION_QUERY = `#graphql
query collection($handle: String!, $first: Int, $last: Int, $endCursor: String, $startCursor: String) {
  collection(handle: $handle) {
    id
    title
    handle
    products(first: $first, last: $last, after: $startCursor, before: $endCursor) {
      nodes {
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
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
}
`
