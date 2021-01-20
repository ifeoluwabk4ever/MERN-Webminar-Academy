import axios from 'axios'
import { toast } from 'react-toastify'
import { GET_FACULTY, DELETE_FACULTY, FACULTY_LOADING, GET_FACULTY_FAIL, DELETE_FACULTY_FAIL, UPDATE_FACULTY_FAIL, UPDATE_FACULTY, ADD_FACULTY, ADD_FACULTY_FAIL } from './ActionTypes'



export let getFaculty = () => async dispatch => {
   try {
      let res = await axios.get(`/webminar/all-faculty`)
      dispatch({
         type: GET_FACULTY,
         payload: res.data.allFaculty
      })
      // console.log(res.data.allFaculty);
   } catch (error) {
      dispatch({ type: GET_FACULTY_FAIL })
   }
}

export let addFaculty = ({ faculty_name, faculty_code }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   let body = JSON.stringify({ faculty_name, faculty_code })
   try {
      dispatch(setItemLoading())
      let res = await axios.post(`/webminar/all-faculty`, body, config)
      dispatch({
         type: ADD_FACULTY,
         payload: res.data
      })
      dispatch(getFaculty())
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: ADD_FACULTY_FAIL })
   }
}


export let editFaculty = ({ course_slug, name }) => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.put(`/webminar/all-faculty/${course_slug}`, { name })
      dispatch({
         type: UPDATE_FACULTY,
         payload: res.data
      })
      dispatch(getFaculty())
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: UPDATE_FACULTY_FAIL })
   }
}

export let deleteFaculty = course_slug => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.delete(`/webminar/all-faculty/${course_slug}`)
      dispatch({
         type: DELETE_FACULTY,
         payload: course_slug
      })
      toast.success(res.data.msg)
      dispatch(getFaculty())
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: DELETE_FACULTY_FAIL })
   }
}

export let setItemLoading = () => {
   return {
      type: FACULTY_LOADING
   }
}