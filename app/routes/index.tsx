import type {MetaFunction} from '@shopify/remix-oxygen'

import {Collections} from '~/components/Collections'
import {HeroBanner} from '~/components/HeroBanner'
import {NewReleases} from '~/components/NewReleases'
import {OurFavorites} from '~/components/OurFavorites'
import {Recomendations} from '~/components/Recomendations'

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
      <HeroBanner />
      <Collections />
      <Recomendations />
      <NewReleases />
      <OurFavorites />
    </div>
  )
}
