import type {MetaFunction} from '@shopify/remix-oxygen'

import {Collections} from '~/components/Collections'
import {HeroBanner} from '~/components/HeroBanner'
import {NewReleases} from '~/components/NewReleases'
import {OurFavorites} from '~/components/OurFavorites'
import {Recomendations} from '~/components/Recomendations'

export const meta: MetaFunction = () => {
  return {
    title: 'Hydrogen',
    description: 'A custom storefront powered by Hydrogen'
  }
}

export default function Index() {
  return (
    <div>
      <HeroBanner />
      <Collections />
      <Recomendations
        products={[0, 1, 2, 3, 4, 5, 6, 7]}
        title="Recommendations for you"
      />
      <NewReleases />
      <OurFavorites />
    </div>
  )
}
