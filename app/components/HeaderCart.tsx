import {Await} from '@remix-run/react'
import type {FunctionComponent} from 'react'
import {Suspense} from 'react'

interface HeaderCartProps {
  cart: any
}

export const HeaderCart: FunctionComponent<HeaderCartProps> = ({cart}) => {
  return (
    <Suspense>
      <Await resolve={cart}>
        {(data: any) => (
          <div>
            cart<span>{data?.totalQuantity}</span>
          </div>
        )}
      </Await>
    </Suspense>
  )
}
