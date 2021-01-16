import axios from 'axios'
import { toast } from 'react-toastify'
import { GET_DEPARTMENT, DELETE_DEPARTMENT, DEPARTMENT_LOADING, GET_DEPARTMENT_FAIL, DELETE_DEPARTMENT_FAIL, UPDATE_DEPARTMENT_FAIL, UPDATE_DEPARTMENT } from './ActionTypes'



export let getDepartment = () => async dispatch => {
   try {
      let res = await axios.get(`/webminar/all-department`)
      dispatch({
         type: GET_DEPARTMENT,
         payload: res.data.allDepartment
      })
      // console.log(res.data.allDepartment);
   } catch (error) {
      dispatch({ type: GET_DEPARTMENT_FAIL })
   }
}

export let editDepartment = ({ course_slug, name }) => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.put(`/webminar/all-department/${course_slug}`, { name })
      dispatch({
         type: UPDATE_DEPARTMENT,
         payload: res.data
      })
      dispatch(getDepartment())
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: UPDATE_DEPARTMENT_FAIL })
   }
}

export let deleteDepartment = course_slug => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.delete(`/webminar/all-department/${course_slug}`)
      dispatch({
         type: DELETE_DEPARTMENT,
         payload: course_slug
      })
      toast.success(res.data.msg)
      dispatch(getDepartment())
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: DELETE_DEPARTMENT_FAIL })
   }
}

export let setItemLoading = () => {
   return {
      type: DEPARTMENT_LOADING
   }
}