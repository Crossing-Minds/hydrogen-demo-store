export const getIdFromShopifyEntityId = (
  entityId: string,
  shopifyId?: string
) => {
  return (shopifyId || '').replace(`gid://shopify/${entityId}/`, '')
}
