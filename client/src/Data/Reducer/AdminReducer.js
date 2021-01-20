import { ADMIN_AUTH_ERROR, ADMIN_LOGIN_FAIL, ADMIN_LOGIN_SUCCESS, ADMIN_REGISTER_FAIL, ADMIN_REGISTER_SUCCESS, ADMIN_SET_LOADING, ADMIN_USER_LOADED, LOGOUT } from '../Actions/ActionTypes'

// Initial State
const initialState = {
   token: localStorage.getItem('token'),
   isLoading: null,
   isAdmin: null,
   admin: null
}

// Reducers
export default (state = initialState, action) => {
   let { type, payload } = action
   switch (type) {
      case ADMIN_USER_LOADED:
         return {
            ...state,
            admin: payload,
            isAdmin: true,
            isLoading: false
         }
      case ADMIN_REGISTER_SUCCESS:
      case ADMIN_LOGIN_SUCCESS:
         // Set token in local Storage
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload
         }
      case ADMIN_SET_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case ADMIN_REGISTER_FAIL:
      case ADMIN_LOGIN_FAIL:
      case ADMIN_AUTH_ERROR:
      case LOGOUT:
         // Remove token in local Storage
         localStorage.removeItem('token')
         return {
            ...state,
            token: null,
            admin: null,
            isAdmin: false,
            isLoading: false
         }
      default: return state
   }
}
