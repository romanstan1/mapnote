import {ADD_NOTE, LOGGED_IN_SUCCESSFULLY, NOT_LOGGED_IN} from './actions'

export const initialState = {
  notes: [],
  user: null,
  user_logged_in: 'pending',
}

export default (state=initialState, action) => {
  switch(action.type){
    case ADD_NOTE: {
      return {
        ...state,
        notes: [...state.notes, action.payload]
      }
    }
    case LOGGED_IN_SUCCESSFULLY: {
      return {
        ...state,
        user: action.payload,
        user_logged_in: true
      }
    }
    case NOT_LOGGED_IN: {
      return {
        ...state,
        user: null,
        user_logged_in: null
      }
    }
    default: return state
  }
}
