import { GET_FEEDBACK, ADD_FEEDBACK, FEEDBACK_LOADING, GET_FEEDBACK_FAIL, ADD_FEEDBACK_FAIL } from '../Actions/ActionTypes'


// Initial State
let initialState = {
   feedback: [],
   isLoading: false,
   isValidAuth: null,
   isValid: null,
}

export default (state = initialState, action) => {
   let { payload, type } = action
   switch (type) {
      case GET_FEEDBACK:
         return {
            ...state,
            feedback: payload,
            isValid: true,
            isLoading: false
         }
      case ADD_FEEDBACK:
         return {
            ...state,
            feedback: [payload, ...state.feedback],
            isValidAuth: true
         }
      case FEEDBACK_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case ADD_FEEDBACK_FAIL:
      case GET_FEEDBACK_FAIL:
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