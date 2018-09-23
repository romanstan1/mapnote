import {LOGGED_IN_SUCCESSFULLY, NOT_LOGGED_IN, RECEIVED_NOTES} from './actions'

export const initialState = {
  notes: [],
  user: null,
  user_logged_in: 'pending',
}

export default (state=initialState, action) => {
  switch(action.type){
    case RECEIVED_NOTES: {
      return {
        ...state,
        notes: Object.entries(action.payload)
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
