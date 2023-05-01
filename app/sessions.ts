import {createCookieSessionStorage} from '@shopify/remix-oxygen'
import {v4 as uuidv4} from 'uuid'

type SessionData = {
  id: string
}

const SECOND = 1
const HOUR = 3600 * SECOND
const DAY = 24 * HOUR

const {commitSession, destroySession, getSession} =
  createCookieSessionStorage<SessionData>({
    cookie: {
      name: '__session',
      maxAge: 7 * DAY
    }
  })

export const generateSessionId = () => uuidv4()

export const getSessionAndSessionId = async (request: Request) => {
  const session = await getSession(request.headers.get('Cookie'))
  let sessionId = session.get('id')

  if (!sessionId) {
    sessionId = generateSessionId()
    session.set('id', sessionId)
  }

  return {session, sessionId}
}

export {commitSession, destroySession, getSession}
