// Root reducer to combine all reducers in the app

import { combineReducers } from 'redux'
import initReg from './InitRegReducer'
import mainStudent from './FinalRegReducer'

export default combineReducers({
   initReg,
   mainStudent
})