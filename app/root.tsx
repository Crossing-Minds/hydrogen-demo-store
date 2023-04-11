import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import type {Shop} from '@shopify/hydrogen/storefront-api-types'
import {
  type LinksFunction,
  type LoaderArgs,
  type MetaFunction
} from '@shopify/remix-oxygen'

import {Layout} from './components/Layout'
import favicon from '../public/favicon.svg'
import './styles/global.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com'
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app'
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon}
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1'
})

export async function loader({context}: LoaderArgs) {
  const layout = await context.storefront.query<{shop: Shop}>(LAYOUT_QUERY)

  return {layout}
}

export default function App() {
  const data = useLoaderData<typeof loader>()

  const {name} = data.layout.shop

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout title={name}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
    }
  }
`
