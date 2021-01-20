import { GET_FACULTY, ADD_FACULTY, DELETE_FACULTY, FACULTY_LOADING, GET_FACULTY_FAIL, ADD_FACULTY_FAIL, DELETE_FACULTY_FAIL, UPDATE_FACULTY_FAIL, UPDATE_FACULTY } from '../Actions/ActionTypes'


// Initial State
let initialState = {
   faculty: [],
   isLoading: false,
   isValidAuth: null,
   isValid: null,
}

export default (state = initialState, action) => {
   let { payload, type } = action
   switch (type) {
      case GET_FACULTY:
         return {
            ...state,
            faculty: payload,
            isValid: true,
            isLoading: false
         }
      case DELETE_FACULTY:
         return {
            ...state,
            faculty: state.faculty.filter(item => item.faculty_id !== payload),
            isLoading: false,
            isValidAuth: true
         }
      case ADD_FACULTY:
         return {
            ...state,
            faculty: [payload, ...state.faculty],
            isValidAuth: true
         }
      case UPDATE_FACULTY:
         return {
            ...state,
            faculty: [...state.faculty],
            isValidAuth: true
         }
      case FACULTY_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case ADD_FACULTY_FAIL:
      case DELETE_FACULTY_FAIL:
      case GET_FACULTY_FAIL:
      case UPDATE_FACULTY_FAIL:
         return {
            ...state,
            isLoading: false,
            isValidAuth: false,
            isValid: false,
         }
      default:
         return state
   }
}