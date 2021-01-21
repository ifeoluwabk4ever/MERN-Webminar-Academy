import axios from 'axios'
import { toast } from 'react-toastify'
import { GET_FEEDBACK, FEEDBACK_LOADING, GET_FEEDBACK_FAIL, ADD_FEEDBACK, ADD_FEEDBACK_FAIL } from './ActionTypes'



export let getFeedback = () => async dispatch => {
   try {
      let res = await axios.get(`/webminar/all-feedback`)
      dispatch({
         type: GET_FEEDBACK,
         payload: res.data.allFeedbacks
      })
      // console.log(res.data.allFeedback);
   } catch (error) {
      dispatch({ type: GET_FEEDBACK_FAIL })
   }
}

export let addFeedback = ({ name, email, telephone, message }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   let body = JSON.stringify({ name, email, telephone, message })
   try {
      dispatch(setItemLoading())
      let res = await axios.post(`/webminar/all-feedback`, body, config)
      dispatch({
         type: ADD_FEEDBACK,
         payload: res.data
      })
      dispatch(getFeedback())
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: ADD_FEEDBACK_FAIL })
   }
}
export let setItemLoading = () => {
   return {
      type: FEEDBACK_LOADING
   }
}