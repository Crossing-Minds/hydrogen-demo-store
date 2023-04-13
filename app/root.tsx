import {cssBundleHref} from '@remix-run/css-bundle'
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
import {themeClass} from './styles/theme.css'
import favicon from '../public/favicon.svg'
import './styles/global.css'

export const links: LinksFunction = () => {
  return [
    {
      href: 'https://cdn.shopify.com',
      rel: 'preconnect'
    },
    {
      href: 'https://shop.app',
      rel: 'preconnect'
    },
    {
      href: favicon,
      rel: 'icon',
      type: 'image/svg+xml'
    },
    {
      href: cssBundleHref as string,
      rel: 'stylesheet'
    },
    {
      href: 'https://fonts.googleapis.com/css?family=Nanum Myeongjo',
      rel: 'stylesheet'
    }
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
      <body className={themeClass}>
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
