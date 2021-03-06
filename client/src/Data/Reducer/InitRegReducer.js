import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, SET_LOADING } from '../Actions/ActionTypes'

// Initial State
const initialState = {
   token: localStorage.getItem('token'),
   isLoading: null,
   isRegID: null,
   newUser: null
}

// Reducers
export default (state = initialState, action) => {
   let { type, payload } = action
   switch (type) {
      case USER_LOADED:
         return {
            ...state,
            newUser: payload,
            isRegID: true,
            isLoading: false
         }
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         // Set token in local Storage
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload
         }
      case SET_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
         // Remove token in local Storage
         localStorage.removeItem('token')
         return {
            ...state,
            token: null,
            newUser: null,
            isRegID: false,
            isLoading: false
         }
      default: return state
   }
}