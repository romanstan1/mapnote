
import {ADD_NOTE} from './actions'

export const addNote = (latitude, longitude) => dispatch => {
  return dispatch({
    type: ADD_NOTE,
    payload: { latitude, longitude }
  })
}
