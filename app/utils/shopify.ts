export enum SHOPIFY_ENTITY_TYPES {
  COLLECTION = 'Collection',
  PRODUCT_VARIANT = 'ProductVariant'
}

export const getIdFromShopifyEntityId = (
  entityId: string,
  shopifyId: string
) => {
  return shopifyId.replace(`gid://shopify/${entityId}/`, '')
}

export const getShopifyEntityIdFromId = (entityId: string, id: string) => {
  return `gid://shopify/${entityId}/${id}`
}
