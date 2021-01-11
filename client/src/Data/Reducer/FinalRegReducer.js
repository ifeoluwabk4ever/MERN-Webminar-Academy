import { STUDENT_AUTH_ERROR, STUDENT_LOGIN_FAIL, STUDENT_LOGIN_SUCCESS, LOGOUT, STUDENT_REGISTER_FAIL, STUDENT_REGISTER_SUCCESS, STUDENT_SET_LOADING, STUDENT_USER_LOADED } from "../Actions/ActionTypes"


// Initial State
const initialState = {
   token: localStorage.getItem('token'),
   isValidStudent: null,
   isLoading: null,
   student: null
}

// Reducers
export default (state = initialState, action) => {
   let { type, payload } = action
   switch (type) {
      case STUDENT_USER_LOADED:
         return {
            ...state,
            student: payload,
            isValidStudent: true,
            isLoading: false
         }
      case STUDENT_REGISTER_SUCCESS:
      case STUDENT_LOGIN_SUCCESS:
         // Set token in local Storage
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload
         }
      case STUDENT_SET_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case STUDENT_REGISTER_FAIL:
      case STUDENT_LOGIN_FAIL:
      case STUDENT_AUTH_ERROR:
      case LOGOUT:
         // Remove token in local Storage
         localStorage.removeItem('token')
         return {
            ...state,
            token: null,
            student: null,
            isValidStudent: false,
            isLoading: false
         }
      default: return state
   }
}