import {database, auth, provider, persistance} from '../firebase-init'
import {
  ADD_NOTE,
  LOGGED_IN_SUCCESSFULLY,
  NOT_LOGGED_IN,
  RECEIVED_NOTES,
  FAILED_UPLOAD,
  SUCCESSFUL_UPLOAD
} from './actions'

export const addNote = (latitude, longitude) => dispatch => {
  return dispatch({
    type: ADD_NOTE,
    payload: { latitude, longitude }
  })
}

export const uploadNote = (userId, lat, lng) => (dispatch) => {
  const noteId = database.ref().child('users').push().key
  const updates = {};
  updates[userId +'/' + noteId] = {
    leftByUserId: userId,
    noteId,
    title: 'Title of note',
    content: 'Content of note',
    hiddenContent: 'Hidden Content',
    views: [],
    lat, lng,
    date: new Date().toString()
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

export const fetchAllNotes = (dispatch) => {
  database.ref('/').on('value', snapshot => {
    const notes =  snapshot.val()
    console.log('notes', notes)
    dispatch({
      type: RECEIVED_NOTES,
      // payload: posts? Object.keys(posts).map(e => posts[e]) : []
      payload: notes
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

  const delayedPromise = delay(0) // UPDATE THIS TO at least 1000
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
