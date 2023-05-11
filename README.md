# Crossing Minds Hydrogen Demo Store

This repository contains a demo store using [Shopify's Hydrogen](https://hydrogen.shopify.dev/) together with our recommendation client [Beam React](https://www.npmjs.com/package/@crossingminds/beam-react).
Hydrogen is Shopify’s stack for headless commerce, designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework.

## Installation

**Requirements:**

- Node.js version 16.14.0 or higher
- [pnpm](https://pnpm.io/) (package manager)

### _Getting started_

In order to get the project up and running, you need to configure Shopify, configure Beam and then run `pnpm` to have the app running locally.

### _Shopify configuration_

Copy `.env.example` to `.env` and update the values with the ones for you store. If you need more information about those values, you can check the documentation [here](https://shopify.dev/docs/custom-storefronts/hydrogen/environment-variables).

- _PUBLIC_STOREFRONT_API_TOKEN_: The public access token for the Storefront API.
- _PUBLIC_STOREFRONT_API_VERSION_: The Storefront API version. Defaults to the version of the Storefront API used by Hydrogen.
- _PUBLIC_STORE_DOMAIN_: The domain of the store used to communicate with the Storefront API.
- SESSION_SECRET: A secret used to sign session cookies. Refer to the Remix documentation on using sessions for more information.

### _Beam configuration_

To configure Beam, you need to set 3 parameters in `app/beam/config.tsx`:

- _databaseId_: database identifier in the same organization as your service account.
- _password_: password for the service account
- _serviceLoginId_: service account with a frontend role

### _Run project_

Once the configuration is completed, you can run project locally with:

```bash
pnpm install
pnpm dev
```

## Implementing recommendations

### _Description_

In a Hydrogen project, since Remix is used, we can render both on the server and on the client. Everything that we want to render on the server, we must do it using the _loader_ function of each of the routes, and everything that we want to render on the client, we can do it using the _action_ function and fetcher.

In the case of recommendations, the decision of where to render will be determined by where the recommendations are obtained.

### _Server side recommendations_

Whenever possible, it's best to render on the server, so recommendations will need to be fetched on the server. Here is an example of a route that gets recommendations and renders them to the server:

```typescript
export const loader = async ({context, request}: LoaderArgs) => {
  const {sessionId} = await getSessionAndSessionId(request);

  const {itemIds: variantIdsForOurFavorites} =
    await getPersonalizedRecommendations({
      ...BEAM_REACT_OPTIONS,
      sessionId,
      sessionScenario: 'some scenario id',
      maxResults: 8,
    });

  const {nodes: productVariants} = await context.storefront.query<Promise<any>>(
    PRODUCTS_BY_VARIANT_QUERY,
    {
      variables: variantIdsForOurFavorites.map(
        (variantId) => `gid://shopify/ProductVariant/${variantId}`,
      ),
    },
  );

  return json({productVariants});
};

export const shouldRevalidate = () => false;

export default function Index() {
  const {productVariants} = useLoaderData<typeof loader>();

  return (
    <div>
      <Recommendations productVariants={productVariants} />
    </div>
  );
}
```

The first step is to obtain the IDs of the recommendations (they can be products or, as in the case of the home page of the same demo store, collections):

```typescript
const {itemIds: variantIdsForOurFavorites} =
  await getPersonalizedRecommendations({
    ...BEAM_REACT_OPTIONS,
    sessionId,
    sessionScenario: 'some scenario id',
    maxResults: 8,
  });
```

With that list of IDs (in the example product variants), we can use Shopify's GraphQL API to get the product variants:

```typescript
const {nodes: productVariants} = await context.storefront.query<Promise<any>>(
  PRODUCTS_BY_VARIANT_QUERY,
  {
    variables: variantIdsForOurFavorites.map(
      (variantId) => `gid://shopify/ProductVariant/${variantId}`,
    ),
  },
);
```

Once obtained, we will pass them by returning them in the _loader_ function:

```typescript
return json({productVariants});
```

And now, the React component will be able to obtain and paint them or pass them as a parameter to other components:

```typescript
const {productVariants} = useLoaderData<typeof loader>();

return (
  <div>
    <Recommendations productVariants={productVariants} />
  </div>
);
```

It is important to understand this line of code that is indicated in the route. When using fetcher, Remix by default fetches a parallel version of the same page we are on, and replaces it with the current one, resulting in a re-render. To avoid this, in those routes that we do not want to have said automatic update, we can indicate that it should not revalidate.

```typescript
export const shouldRevalidate = () => false;
```

### _Client side recommendations_

There may be cases where we need client data to customize recommendations, so we won't be able to render them directly on the server. This is the example of the recommendations that appear in the cart drawer of the demo store. These recommendations are customized according to what products are in the cart, so we cannot obtain them like any other route, since there is no complete navigation.

In these cases, the correct thing to do is to use a specific route that will serve as an "endpoint" to obtain the recommendations and their associated products. This is where the _action_ function of the route and the use of fetcher come into play.

```typescript
import {type LoaderArgs, json, redirect} from '@shopify/remix-oxygen';

import {PRODUCTS_BY_VARIANT_QUERY} from '~/queries/product';
import {SHOPIFY_ENTITY_TYPES, getShopifyEntityIdFromId} from '~/utils/shopify';

export async function action({request, context}: LoaderArgs) {
  const [formData] = await Promise.all([request.formData()]);
  let itemIds: string[] = [];

  try {
    itemIds = JSON.parse((formData.get('itemIds') as string) || '') as string[];
  } catch {
    return json({nodes: []});
  }

  const {nodes} = await context.storefront.query<Promise<any>>(
    PRODUCTS_BY_VARIANT_QUERY,
    {
      variables: {
        ids: (itemIds as string[]).map((itemId) =>
          getShopifyEntityIdFromId(
            SHOPIFY_ENTITY_TYPES.PRODUCT_VARIANT,
            itemId,
          ),
        ),
      },
    },
  );

  return json(nodes);
}

export const loader = async () => {
  return redirect('/');
};

export default function CartRecommendations() {
  return <></>;
}
```

The first thing is to have a route with the _action_ function implemented. That function will receive the parameters that we pass to it in the request body.

```typescript
const [formData] = await Promise.all([request.formData()]);
let itemIds: string[] = [];

try {
  itemIds = JSON.parse((formData.get('itemIds') as string) || '') as string[];
} catch {
  return json({nodes: []});
}
```

Now we can use those IDs to obtain the product variants using the GraphQL API from Shopify.

```typescript
const {nodes} = await context.storefront.query<Promise<any>>(
  PRODUCTS_BY_VARIANT_QUERY,
  {
    variables: {
      ids: (itemIds as string[]).map((itemId) =>
        getShopifyEntityIdFromId(SHOPIFY_ENTITY_TYPES.PRODUCT_VARIANT, itemId),
      ),
    },
  },
);
```

Finally, a JSON is returned in the same way with all the data that our components need.

```typescript
return json(nodes);
```

Since we've created a new route, that means our route could be accessible via a URL like any other page. To avoid this, in addition to not returning anything in the main function (safety belt), the important thing is to make a redirect to where we consider within the _loader_ function. In the case of the example, a redirection is made to the home page.

```typescript
export const loader = async () => {
  return redirect('/');
};

export default function CartRecommendations() {
  return <></>;
}
```

Now that we have our "endpoint", the way to call it is using fetcher. The component that is responsible for getting the recommendations will make a call to the route we have created by submitting a form.

```typescript
const contextItems = cart.lines.edges.map((lineEdge) => {
  return {
    itemId: getIdFromShopifyEntityId(
      SHOPIFY_ENTITY_TYPES.PRODUCT_VARIANT,
      lineEdge.node.merchandise.id,
    ),
  };
});

const {itemIds} = await getPersonalizedRecommendations({
  ...BEAM_REACT_OPTIONS,
  sessionId,
  contextItems,
  sessionWithContextScenario:
    RECOMMENDATION_SCENARIOS.CART_FREQUENTLY_PURCHASED_TOGETHER,
  maxResults: 8 + contextItems.length,
});

fetcher.submit(
  {itemIds: JSON.stringify(itemIds)},
  {method: 'post', action: '/cartRecommendations'},
);
```

That call will be captured by fetcher, processed and made available to our component using fetcher.data (a complete example of this can be found in `app/hooks/useCartRecommendations.tsx`).

```typescript
useEffect(() => {
  if (fetcher.state === 'idle' && fetcher.data) {
    setCartRecommendations(removeRepeatedCartRecommendations(fetcher.data));
    setCartRecommendationsLoading(false);
    setCartRecommendationsError(false);
  }
}, [fetcher]);
```

### _Summary_

As we have seen, despite the fact that rendering can be done both on the server and on the client, obtaining the data from the Shopify GraphQL API is always done on the server.
