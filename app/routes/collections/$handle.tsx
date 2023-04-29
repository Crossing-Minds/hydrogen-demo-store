import {useLoaderData} from '@remix-run/react'
import type {LoaderArgs} from '@shopify/remix-oxygen'
import {json} from '@shopify/remix-oxygen'

import {Collection} from '~/components/Collection'
import {COLLECTION_QUERY} from '~/queries/collection'
import {commitSession, getSessionAndSessionId} from '~/sessions'

export async function action({context, params, request}: LoaderArgs) {
  const {handle} = params
  const [formData] = await Promise.all([request.formData()])
  let pageInfo: any

  try {
    pageInfo = JSON.parse((formData.get('pageInfo') as string) || '') as any
  } catch {
    return json([])
  }

  const {
    collection: {products}
  } = await context.storefront.query<Promise<any>>(COLLECTION_QUERY, {
    variables: {
      ...pageInfo,
      handle
    }
  })

  console.log('products', products, {
    variables: {
      ...pageInfo,
      handle
    }
  })

  return json(products)
}

export const loader = async ({context, params, request}: LoaderArgs) => {
  const {session, sessionId} = await getSessionAndSessionId(request)
  const {handle} = params
  const {collection} = await context.storefront.query<Promise<any>>(
    COLLECTION_QUERY,
    {
      variables: {
        handle,
        first: 12
      }
    }
  )

  if (!collection?.id) {
    throw new Response(undefined, {status: 404})
  }

  return json(
    {collection},
    {headers: {'Set-Cookie': await commitSession(session)}}
  )
}

export default function CollectionHandle() {
  const {collection} = useLoaderData<typeof loader>()

  return <Collection collection={collection} />
}
