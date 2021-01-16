import { GET_DEPARTMENT, ADD_DEPARTMENT, DELETE_DEPARTMENT, DEPARTMENT_LOADING, GET_DEPARTMENT_FAIL, ADD_DEPARTMENT_FAIL, DELETE_DEPARTMENT_FAIL, UPDATE_DEPARTMENT_FAIL, UPDATE_DEPARTMENT } from '../Actions/ActionTypes'


// Initial State
let initialState = {
   department: [],
   isLoading: false,
   isValid: null
}

export default (state = initialState, action) => {
   let { payload, type } = action
   switch (type) {
      case GET_DEPARTMENT:
         return {
            ...state,
            department: payload,
            isValid: true,
            isLoading: false
         }
      case DELETE_DEPARTMENT:
         return {
            ...state,
            department: state.department.filter(item => item.department_id !== payload),
            isLoading: false
         }
      case ADD_DEPARTMENT:
         return {
            ...state,
            department: [payload, ...state.department]
         }
      case UPDATE_DEPARTMENT:
         return {
            ...state,
            department: [...state.department]
         }
      case DEPARTMENT_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case ADD_DEPARTMENT_FAIL:
      case DELETE_DEPARTMENT_FAIL:
      case GET_DEPARTMENT_FAIL:
      case UPDATE_DEPARTMENT_FAIL:
         return {
            ...state,
            isLoading: false,
            isValid: false
         }
      default:
         return state
   }
}