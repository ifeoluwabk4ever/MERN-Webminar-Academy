// Root reducer to combine all reducers in the app

import { combineReducers } from 'redux'
import initReg from './InitRegReducer'
import mainStudent from './FinalRegReducer'
import mainAcadStaff from './AcademicStaffReducer'
import mainDepartment from './DepartmentReducer'
import mainFaculty from './FacultyReducer'
import mainCourses from './CoursesReducer'
import mainAdmin from './AdminReducer'
import mainNews from './NewsReducer'
import mainFeedback from './FeedbackReducer'

export default combineReducers({
   initReg,
   mainStudent,
   mainAcadStaff,
   mainDepartment,
   mainFaculty,
   mainCourses,
   mainAdmin,
   mainNews,
   mainFeedback
})