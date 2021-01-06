// Root reducer to combine all reducers in the app

import { combineReducers } from 'redux'
import initReg from './InitRegReducer'

export default combineReducers({
   initReg
})