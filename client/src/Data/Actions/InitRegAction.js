import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../Helpers/SetAuthToken'
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, SET_LOADING, LOGIN_SUCCESS, LOGIN_FAIL } from './ActionTypes'


// LoadUser Action
export let loadNewUser = () => async dispatch => {
   if (localStorage.token) {
      setAuthToken(localStorage.token)
   }

   try {
      let res = await axios.get(`/api/new-student/info`)
      dispatch({
         type: USER_LOADED,
         payload: res.data.user
      })
   } catch (error) {
      console.log(error.response.data.msg);
      dispatch({ type: AUTH_ERROR })

   }
}


// Register Action
export let registerNewUser = ({ firstName, lastName, email, telephone, dob, avatar }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ firstName, lastName, email, telephone, dob, avatar })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/api/new-student/register`, body, config)
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data
      })
      dispatch(loadNewUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: REGISTER_FAIL })
   }
}


// Login Action
export let loginNewPostUtmeUser = ({ regID, passcode }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ regID, passcode })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/api/new-student/login`, body, config)
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
      })
      dispatch(loadNewUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: LOGIN_FAIL })
   }
}

// Login Action
export let loginNewNormalUser = ({ regID, passcode }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ regID, passcode })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/api/new-student/login-normal`, body, config)
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
      })
      dispatch(loadNewUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: LOGIN_FAIL })
   }
}


// Logout Action
export let logout = () => async dispatch => {
   dispatch({ type: LOGOUT })
   toast.success("Logout success")
}