import axios from 'axios'
import { toast } from 'react-toastify'
import { GET_COURSES, DELETE_COURSES, COURSES_LOADING, GET_COURSES_FAIL, DELETE_COURSES_FAIL, UPDATE_COURSES_FAIL, UPDATE_COURSES, GET_USER_COURSES_FAIL, GET_USER_COURSES, ADD_COURSES, ADD_COURSES_FAIL } from './ActionTypes'



export let getCourses = () => async dispatch => {
   try {
      let res = await axios.get(`/webminar/all-courses`)
      dispatch({
         type: GET_COURSES,
         payload: res.data.allCourses
      })
      // console.log(res.data.allCourses);
   } catch (error) {
      dispatch({ type: GET_COURSES_FAIL })
   }
}

export let addCourses = ({ course_code, course_title, course_unit, isFacultyCourse, isGeneralCourse, level, department, semester }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   let body = JSON.stringify({ course_code, course_title, course_unit, isFacultyCourse, isGeneralCourse, level, department, semester })
   try {
      dispatch(setItemLoading())
      let res = await axios.post(`/webminar/all-courses`, body, config)
      dispatch({
         type: ADD_COURSES,
         payload: res.data
      })
      dispatch(getCourses())
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: ADD_COURSES_FAIL })
   }
}

export let editCourses = ({ course_slug, name }) => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.put(`/webminar/all-courses/${course_slug}`, { name })
      dispatch({
         type: UPDATE_COURSES,
         payload: res.data
      })
      dispatch(getCourses())
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: UPDATE_COURSES_FAIL })
   }
}

export let deleteCourses = course_slug => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.delete(`/webminar/all-courses/${course_slug}`)
      dispatch({
         type: DELETE_COURSES,
         payload: course_slug
      })
      toast.success(res.data.msg)
      dispatch(getCourses())
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: DELETE_COURSES_FAIL })
   }
}

export let getUserCourse = ({ level, semester }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ level, semester })
   try {
      dispatch(setItemLoading())
      let res = await axios.post(`/webminar/all-courses/user-courses`, body, config)
      dispatch({
         type: GET_USER_COURSES,
         payload: res.data.userCourse
      })
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: GET_USER_COURSES_FAIL })
   }
}

export let setItemLoading = () => {
   return {
      type: COURSES_LOADING
   }
}