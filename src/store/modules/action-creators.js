import {database, auth, provider, persistance} from '../firebase-init'
import {
  ADD_NOTE,
  LOGGED_IN_SUCCESSFULLY,
  NOT_LOGGED_IN
} from './actions'

export const addNote = (latitude, longitude) => dispatch => {
  return dispatch({
    type: ADD_NOTE,
    payload: { latitude, longitude }
  })
}

export const logIn = () => (dispatch, getState) => {
  auth.setPersistence(persistance.SESSION).then(() =>
    auth.signInWithRedirect(provider)
  )
}

export const checkIfLoggedIn =  async (dispatch) => {
  const delay = time => new Promise(res => setTimeout(()=>res(),time))
  const getAuthState = () => new Promise(res => auth.onAuthStateChanged(user => res(user)))

  const delayedPromise = delay(3000)
  const authPromise = getAuthState()

  await delayedPromise
  const user = await authPromise;

  if (user) dispatch({
    type: LOGGED_IN_SUCCESSFULLY,
    payload: user
  })
  else dispatch({
    type: NOT_LOGGED_IN
  })
}
