// Root reducer to combine all reducers in the app

import { combineReducers } from 'redux'
import initReg from './InitRegReducer'
import mainStudent from './FinalRegReducer'
import mainAcadStaff from './AcademicStaffReducer'
import mainDepartment from './DepartmentReducer'
import mainCourses from './CoursesReducer'

export default combineReducers({
   initReg,
   mainStudent,
   mainAcadStaff,
   mainDepartment,
   mainCourses
})