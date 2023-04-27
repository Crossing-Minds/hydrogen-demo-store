import {cssBundleHref} from '@remix-run/css-bundle'
import {Links, Meta, Outlet, Scripts, ScrollRestoration} from '@remix-run/react'
import type {Shop} from '@shopify/hydrogen/storefront-api-types'
import {
  type LinksFunction,
  type LoaderArgs,
  type MetaFunction,
  defer,
  json
} from '@shopify/remix-oxygen'
import swiperStyle from 'swiper/swiper.min.css'

import {cartAdd, cartCreate, cartRemove, getCart} from './api/cart'
import {Layout} from './components/Layout'
import {themeClass} from './styles/theme.css'
import favicon from '../public/favicon.svg'
import './styles/reset.css'
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
      href: swiperStyle,
      rel: 'stylesheet'
    },
    {
      href: cssBundleHref as string,
      rel: 'stylesheet'
    },
    {
      href: 'https://fonts.googleapis.com/css?family=Nanum Myeongjo',
      rel: 'stylesheet'
    },
    {
      href: 'https://fonts.googleapis.com/css?family=Open Sans',
      rel: 'stylesheet'
    }
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1'
})

export async function action({request, context}: LoaderArgs) {
  const {session, storefront} = context
  const headers = new Headers()

  const [formData, storedCartId] = await Promise.all([
    request.formData(),
    session.get('cartId')
  ])

  let cartId = storedCartId
  const status = 200
  let result

  const cartAction = formData.get('cartAction')
  const countryCode = formData.get('countryCode') || undefined

  switch (cartAction) {
    case 'ADD_TO_CART':
      const lines = formData.get('lines')
        ? JSON.parse(String(formData.get('lines')))
        : []

      if (!cartId) {
        result = await cartCreate({
          input: countryCode ? {lines, buyerIdentity: {countryCode}} : {lines},
          storefront
        })
      } else {
        result = await cartAdd({
          cartId,
          lines,
          storefront
        })
      }

      cartId = result.cart.id
      break
    case 'REMOVE_FROM_CART':
      const lineIds = formData.get('linesIds')
        ? JSON.parse(String(formData.get('linesIds')))
        : []

      if (!lineIds.length) {
        throw new Error('No lines to remove')
      }

      result = await cartRemove({
        cartId,
        lineIds,
        storefront
      })

      cartId = result.cart.id
      break
    default:
      throw new Error('Invalid cart action')
  }

  /**
   * The Cart ID may change after each mutation. We need to update it each time in the session.
   */
  session.set('cartId', cartId)
  headers.set('Set-Cookie', await session.commit())

  const {cart, errors} = result
  return json({cart, errors}, {status, headers})
}

export async function loader({context}: LoaderArgs) {
  const cartId = await context.session.get('cartId')

  return defer({
    cart: cartId ? getCart(context, cartId) : undefined,
    layout: await context.storefront.query<{shop: Shop}>(LAYOUT_QUERY)
  })
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className={themeClass}>
        <Layout>
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
