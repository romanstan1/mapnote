import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import data from './reducers'

export default combineReducers({
  routing: routerReducer,
  data,
})
