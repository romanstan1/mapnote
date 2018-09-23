import {database, auth, provider, persistance} from '../firebase-init'
import {
  ADD_NOTE,
  LOGGED_IN_SUCCESSFULLY,
  NOT_LOGGED_IN,
  RECEIVE_NOTES,
  FAILED_UPLOAD,
  SUCCESSFUL_UPLOAD
} from './actions'

export const addNote = (latitude, longitude) => dispatch => {
  return dispatch({
    type: ADD_NOTE,
    payload: { latitude, longitude }
  })
}

export const uploadNote = (dispatch, title, description, link, nextPostValue) => {
  const id = database.ref().child('posts').push().key
  const updates = {};
  updates['/posts/' + id] = {
    title, description, link, id,
    display: true,
    date: new Date().toString().slice(4,15),
    order: nextPostValue
  }
  database.ref().update(updates, (error) => {
    if(error) {
      dispatch({
        type: FAILED_UPLOAD
      })
    } else {
      dispatch({
        type: SUCCESSFUL_UPLOAD
      })
    }
  })
}


export const fetchPosts = (dispatch) => {
  database.ref('posts/').on('value', snapshot => {
    const posts =  snapshot.val()
    dispatch({
      type: RECEIVE_NOTES,
      payload: posts? Object.keys(posts).map(e => posts[e]) : []
    })
  })
}







export const logIn = () => (dispatch, getState) => {
  auth.setPersistence(persistance.SESSION).then(() =>
    auth.signInWithRedirect(provider)
  )
}

export const logOut = (dispatch) => {
  auth.signOut().then(() => {
    dispatch({
      type: NOT_LOGGED_IN
    })
  }).catch((error) => {
    console.log('Sign-out error!!')
  })
}

export const checkIfLoggedIn =  async (dispatch) => {
  const delay = time => new Promise(res => setTimeout(()=>res(),time))
  const getAuthState = () => new Promise(res => auth.onAuthStateChanged(user => res(user)))

  const delayedPromise = delay(0)
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
