import {ADD_NOTE} from './actions'

export const initialState = {
  notes: [
    // {latitude: 35.907757, longitude: 127.766922},
  ]
}

export default (state=initialState, action) => {
  switch(action.type){
    case ADD_NOTE: {
      return {
        ...state,
        notes: [...state.notes, action.payload]
      }
    }
    default: return state
  }
}
