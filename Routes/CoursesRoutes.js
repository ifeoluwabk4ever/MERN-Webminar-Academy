import express from 'express'

import { addCourse, getAllCourses, getSortedUserCourse } from '../Controllers/CoursesController.js'
import finalAuth from '../Middleware/FinalStudentAuth.js'
import AuthUndergraduate from '../Middleware/FinalStudentVerify.js'


const router = express.Router()


router.route('/all-courses')
   .get(getAllCourses)
   .post(addCourse)

router.post('/all-courses/user-courses', finalAuth, AuthUndergraduate, getSortedUserCourse)


export default router