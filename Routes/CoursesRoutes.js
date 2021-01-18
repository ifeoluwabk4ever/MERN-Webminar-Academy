import express from 'express'

import { addCourse, getAllCourses, getSortedUserCourse } from '../Controllers/CoursesController.js'
import finalAuth from '../Middleware/FinalStudentAuth.js'


const router = express.Router()


router.route('/all-courses')
   .get(getAllCourses)
   .post(addCourse)

router.post('/all-courses/user-courses', finalAuth, getSortedUserCourse)


export default router