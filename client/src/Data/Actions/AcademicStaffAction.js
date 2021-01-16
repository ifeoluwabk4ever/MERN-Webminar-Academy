import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../Helpers/SetAuthToken'
import { ACADEMIC_STAFF_AUTH_ERROR, ACADEMIC_STAFF_LOGIN_FAIL, ACADEMIC_STAFF_LOGIN_SUCCESS, ACADEMIC_STAFF_REGISTER_FAIL, ACADEMIC_STAFF_REGISTER_SUCCESS, ACADEMIC_STAFF_SET_LOADING, ACADEMIC_STAFF_USER_LOADED, LOGOUT } from './ActionTypes'


// LoadUser Action
export let loadAcademicStaff = () => async dispatch => {
   if (localStorage.token) {
      setAuthToken(localStorage.token)
   }

   try {
      let res = await axios.get(`/webminar/academic-staff/staff-info`)
      dispatch({
         type: ACADEMIC_STAFF_USER_LOADED,
         payload: res.data.user
      })
   } catch (error) {
      console.log(error.response.data.msg);
      dispatch({ type: ACADEMIC_STAFF_AUTH_ERROR })

   }
}


// Register Action
export let registerAcademicStaff = ({ firstName, lastName, email, telephone, dob, avatar, department, password }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ firstName, lastName, email, telephone, dob, avatar, department, password })

   dispatch({ type: ACADEMIC_STAFF_SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/webminar/academic-staff/register`, body, config)
      dispatch({
         type: ACADEMIC_STAFF_REGISTER_SUCCESS,
         payload: res.data
      })
      dispatch(loadAcademicStaff())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: ACADEMIC_STAFF_REGISTER_FAIL })
   }
}


// Login Action
export let loginAcademicStaff = ({ staffID, password }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ staffID, password })

   dispatch({ type: ACADEMIC_STAFF_SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/webminar/academic-staff/login`, body, config)
      dispatch({
         type: ACADEMIC_STAFF_LOGIN_SUCCESS,
         payload: res.data
      })
      dispatch(loadAcademicStaff())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: ACADEMIC_STAFF_LOGIN_FAIL })
   }
}


// Logout Action
export let logout = () => async dispatch => {
   dispatch({ type: LOGOUT })
   toast.success("Logout success")
}