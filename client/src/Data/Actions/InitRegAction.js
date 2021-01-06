import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../Helpers/SetAuthToken'
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, ALL_USERS, ALL_USERS_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, SET_LOADING, RETRIEVE_SUCCESS, RETRIEVE_FAIL, LOGIN_POST_UTME, LOGIN_POST_UTME_FAIL } from './ActionTypes'



// LoadAll Users
export let loadAllUsers = () => async dispatch => {
   try {
      dispatch({
         type: SET_LOADING
      })

      let res = await axios.get(`/api/users/all-users`)
      dispatch({
         type: ALL_USERS,
         payload: res.data.msg
      })
   } catch (error) {
      dispatch({ type: ALL_USERS_FAIL })
   }
}

// LoadUser Action
export let loadNewUser = () => async dispatch => {
   if (localStorage.token) {
      setAuthToken(localStorage.token)
   }

   try {
      let res = await axios.get(`/api/new-users/info`)
      dispatch({
         type: USER_LOADED,
         payload: res.data.user,
      })
   } catch (error) {
      // console.log(error.response);
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
      let res = await axios.post(`/api/new-users/register`, body, config)
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
      let res = await axios.post(`/api/new-users/login`, body, config)
      dispatch({
         type: LOGIN_POST_UTME,
         payload: res.data
      })
      dispatch(loadNewUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: LOGIN_POST_UTME_FAIL })
   }
}

// Login Action
export let retrieveUserID = ({ email }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ email })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/api/new-users/retrieve-regID`, body, config)
      dispatch({
         type: RETRIEVE_SUCCESS,
         payload: res.data
      })
      dispatch(loadNewUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: RETRIEVE_FAIL })
   }
}


// Logout Action
export let logout = () => async dispatch => {
   dispatch({ type: LOGOUT })
   toast.success("Logout success")
}