import type {MetaFunction} from '@shopify/remix-oxygen'

import {root} from './index.css'

export const meta: MetaFunction = () => {
  return {
    title: 'Hydrogen',
    description: 'A custom storefront powered by Hydrogen'
  }
}

export default function Index() {
  return (
    <div className={root}>
      <h3>Hello from the home page!</h3>
    </div>
  )
}
