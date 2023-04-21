export const COLLECTIONS_QUERY = `#graphql
query collections($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on Collection {
      id
        title
        image {
          url
        }
    }
  }
}
`
