import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../Helpers/SetAuthToken'
import { ADMIN_AUTH_ERROR, ADMIN_LOGIN_FAIL, ADMIN_LOGIN_SUCCESS, ADMIN_REGISTER_FAIL, ADMIN_REGISTER_SUCCESS, ADMIN_SET_LOADING, ADMIN_USER_LOADED, LOGOUT } from './ActionTypes'


// LoadUser Action
export let loadAdmin = () => async dispatch => {
   if (localStorage.token) {
      setAuthToken(localStorage.token)
   }

   try {
      let res = await axios.get(`/webminar/admin/admin-info`)
      dispatch({
         type: ADMIN_USER_LOADED,
         payload: res.data.user
      })
   } catch (error) {
      console.log(error.response.data.msg);
      dispatch({ type: ADMIN_AUTH_ERROR })

   }
}


// Register Action
export let registerAdmin = ({ firstName, lastName, email, telephone, dob, department, password }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ firstName, lastName, email, telephone, dob, department, password })

   dispatch({ type: ADMIN_SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/webminar/admin/register`, body, config)
      dispatch({
         type: ADMIN_REGISTER_SUCCESS,
         payload: res.data
      })
      dispatch(loadAdmin())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: ADMIN_REGISTER_FAIL })
   }
}


// Login Action
export let loginAdmin = ({ adminID, password }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ adminID, password })

   dispatch({ type: ADMIN_SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/webminar/admin/login`, body, config)
      dispatch({
         type: ADMIN_LOGIN_SUCCESS,
         payload: res.data
      })
      dispatch(loadAdmin())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: ADMIN_LOGIN_FAIL })
   }
}


// Logout Action
export let logout = () => async dispatch => {
   dispatch({ type: LOGOUT })
   toast.success("Logout success")
}