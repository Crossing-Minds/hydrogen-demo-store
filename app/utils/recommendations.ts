export enum RECOMMENDATION_SCENARIOS {
  HOME_COLLECTIONS_FOR_YOU = 'home_collections_for_you',
  HOME_RECOMMENDATIONS_FOR_YOU = 'home_recommendations_for_you',
  HOME_NEW_RELEASES_FOR_YOU = 'home_new_releases_for_you',
  HOME_OUR_FAVORITES = 'home_our_favorites',
  PDP_CUSTOMERS_ALSO_PURCHASES = 'pdp_customers_also_purchases',
  PDP_RECOMMENDATIONS_FOR_YOU = 'pdp_recommendations_for_you',
  PLP_FILTER_BY_COLLECTION = 'plp_filter_by_collection',
  CART_FREQUENTLY_PURCHASED_TOGETHER = 'cart_frequently_purchased_together'
}

export const removeDuplicatedIdsAndGetFirstNth = (
  originIds: string[],
  comparedToIds: string[],
  quantity: number
) => {
  return originIds
    .filter(originId => !comparedToIds.includes(originId))
    .slice(0, quantity)
}
