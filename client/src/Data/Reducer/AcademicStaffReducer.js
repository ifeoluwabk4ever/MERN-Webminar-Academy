import { ACADEMIC_STAFF_AUTH_ERROR, ACADEMIC_STAFF_LOGIN_FAIL, ACADEMIC_STAFF_LOGIN_SUCCESS, ACADEMIC_STAFF_REGISTER_FAIL, ACADEMIC_STAFF_REGISTER_SUCCESS, ACADEMIC_STAFF_SET_LOADING, ACADEMIC_STAFF_USER_LOADED, LOGOUT } from '../Actions/ActionTypes'

// Initial State
const initialState = {
   token: localStorage.getItem('token'),
   isLoading: null,
   isAcadStaff: null,
   acadStaff: null
}

// Reducers
export default (state = initialState, action) => {
   let { type, payload } = action
   switch (type) {
      case ACADEMIC_STAFF_USER_LOADED:
         return {
            ...state,
            acadStaff: payload,
            isAcadStaff: true,
            isLoading: false
         }
      case ACADEMIC_STAFF_REGISTER_SUCCESS:
      case ACADEMIC_STAFF_LOGIN_SUCCESS:
         // Set token in local Storage
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload
         }
      case ACADEMIC_STAFF_SET_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case ACADEMIC_STAFF_REGISTER_FAIL:
      case ACADEMIC_STAFF_LOGIN_FAIL:
      case ACADEMIC_STAFF_AUTH_ERROR:
      case LOGOUT:
         // Remove token in local Storage
         localStorage.removeItem('token')
         return {
            ...state,
            token: null,
            acadStaff: null,
            isAcadStaff: false,
            isLoading: false
         }
      default: return state
   }
}