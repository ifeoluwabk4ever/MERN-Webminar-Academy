import { GET_NEWS, ADD_NEWS, DELETE_NEWS, NEWS_LOADING, GET_NEWS_FAIL, ADD_NEWS_FAIL, DELETE_NEWS_FAIL, UPDATE_NEWS_FAIL, UPDATE_NEWS } from '../Actions/ActionTypes'


// Initial State
let initialState = {
   news: [],
   isLoading: false,
   isValidAuth: null,
   isValid: null,
}

export default (state = initialState, action) => {
   let { payload, type } = action
   switch (type) {
      case GET_NEWS:
         return {
            ...state,
            news: payload,
            isValid: true,
            isLoading: false
         }
      case DELETE_NEWS:
         return {
            ...state,
            news: state.news.filter(item => item.news_id !== payload),
            isLoading: false,
            isValidAuth: true
         }
      case ADD_NEWS:
         return {
            ...state,
            news: [payload, ...state.news],
            isValidAuth: true
         }
      case UPDATE_NEWS:
         return {
            ...state,
            news: [...state.news],
            isValidAuth: true
         }
      case NEWS_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case ADD_NEWS_FAIL:
      case DELETE_NEWS_FAIL:
      case GET_NEWS_FAIL:
      case UPDATE_NEWS_FAIL:
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