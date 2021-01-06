import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, ALL_USERS, ALL_USERS_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, SET_LOADING, LOGIN_POST_UTME, LOGIN_POST_UTME_FAIL } from '../Actions/ActionTypes'

// Initial State
const initialState = {
   token: localStorage.getItem('token'),
   isAuthenticated: null,
   isLoading: null,
   isRegID: null,
   user: null,
   newUser: null,
   allUsers: []
}

// Reducers
export default (state = initialState, action) => {
   let { type, payload } = action
   switch (type) {
      case ALL_USERS:
         return {
            ...state,
            isAuthenticated: true,
            allUsers: payload,
            isLoading: false,
         }
      case USER_LOADED:
         return {
            ...state,
            newUser: payload,
            isAuthenticated: true,
            isRegID: true,
            isLoading: false
         }
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         // Set token in local Storage
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload,
            isAuthenticated: true,
            isLoading: false
         }
      case LOGIN_POST_UTME:
         // Set token in local Storage
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload,
            isAuthenticated: true,
            isRegID: true,
            isLoading: false
         }
      case SET_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case ALL_USERS_FAIL:
      case LOGIN_POST_UTME_FAIL:
      case LOGOUT:
         // Remove token in local Storage
         localStorage.removeItem('token')
         return {
            ...state,
            token: null,
            isRegID: false,
            isAuthenticated: false,
            isLoading: false
         }
      default: return state
   }
}