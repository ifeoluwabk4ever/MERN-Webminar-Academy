import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../Helpers/SetAuthToken'
import { LOGOUT, STUDENT_SET_LOADING, STUDENT_AUTH_ERROR, STUDENT_LOGIN_FAIL, STUDENT_LOGIN_SUCCESS, STUDENT_REGISTER_FAIL, STUDENT_REGISTER_SUCCESS, STUDENT_USER_LOADED } from './ActionTypes'


// LoadUser Action
export let loadMainStudent = () => async dispatch => {
   if (localStorage.token) {
      setAuthToken(localStorage.token)
   }

   dispatch({ type: STUDENT_SET_LOADING })
   try {
      let res = await axios.get(`/api/full-student/student-info`)
      dispatch({
         type: STUDENT_USER_LOADED,
         payload: res.data.user
      })
   } catch (error) {
      console.log(error.response.data.msg);
      dispatch({ type: STUDENT_AUTH_ERROR })

   }
}


// Register Action
export let registerMainStudent = ({ password, isDE }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ password, isDE })

   dispatch({ type: STUDENT_SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/api/full-student/register`, body, config)
      dispatch({
         type: STUDENT_REGISTER_SUCCESS,
         payload: res.data
      })
      dispatch(loadMainStudent())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: STUDENT_REGISTER_FAIL })
   }
}


// Login Action
export let loginMainStudent = ({ matricNo, password }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ matricNo, password })

   dispatch({ type: STUDENT_SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/api/full-student/login`, body, config)
      dispatch({
         type: STUDENT_LOGIN_SUCCESS,
         payload: res.data
      })
      dispatch(loadMainStudent())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: STUDENT_LOGIN_FAIL })
   }
}


// Logout Action
export let logout = () => async dispatch => {
   dispatch({ type: LOGOUT })
   toast.success("Logout success")
}