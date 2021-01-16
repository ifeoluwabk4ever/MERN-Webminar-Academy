import { GET_COURSES, ADD_COURSES, DELETE_COURSES, COURSES_LOADING, GET_COURSES_FAIL, ADD_COURSES_FAIL, DELETE_COURSES_FAIL, UPDATE_COURSES_FAIL, UPDATE_COURSES } from '../Actions/ActionTypes'


// Initial State
let initialState = {
   courses: [],
   isLoading: false,
   isValid: null
}

export default (state = initialState, action) => {
   let { payload, type } = action
   switch (type) {
      case GET_COURSES:
         return {
            ...state,
            courses: payload,
            isValid: true,
            isLoading: false
         }
      case DELETE_COURSES:
         return {
            ...state,
            courses: state.courses.filter(item => item.courses_id !== payload),
            isLoading: false
         }
      case ADD_COURSES:
         return {
            ...state,
            courses: [payload, ...state.courses]
         }
      case UPDATE_COURSES:
         return {
            ...state,
            courses: [...state.courses]
         }
      case COURSES_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case ADD_COURSES_FAIL:
      case DELETE_COURSES_FAIL:
      case GET_COURSES_FAIL:
      case UPDATE_COURSES_FAIL:
         return {
            ...state,
            isLoading: false,
            isValid: false
         }
      default:
         return state
   }
}