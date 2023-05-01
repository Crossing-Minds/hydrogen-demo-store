import {run} from '@crossingminds/utils'
import cookies from 'js-cookie'

export const sessionId = run(() => {
  const base64EncodedObject = cookies.get('__session')

  if (base64EncodedObject && 'atob' in globalThis) {
    try {
      const decodedObject = atob(base64EncodedObject)
      const {id} = JSON.parse(decodedObject)

      return id
    } catch {
      return undefined
    }
  }
})
