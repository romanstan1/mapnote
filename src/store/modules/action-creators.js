import {database, authRef} from '../firebase-init'

import {ADD_NOTE} from './actions'

export const addNote = (latitude, longitude) => dispatch => {
  return dispatch({
    type: ADD_NOTE,
    payload: { latitude, longitude }
  })
}


export const uploadPost = (dispatch, title, description, link, nextPostValue) => {
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
      type: RECEIVE_POSTS,
      payload: posts? Object.keys(posts).map(e => posts[e]) : []
    })
  })
}

export const updateOrder = (dispatch, value, item) => {
  const updates = {};
  updates['/posts/' + item.id] = {
    ...item,
    order: item.order + value? item.order + value : 1
  }
  database.ref().update(updates, (error) => {
    if(error) dispatch({ type: FAILED_UPDATE })
    else dispatch({ type: SUCCESSFUL_UPDATE })
  })
}
