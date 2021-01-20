import express from 'express'

import { addCourse, deleteCourse, editCourse, getAllCourses, getSortedUserCourse } from '../Controllers/CoursesController.js'
import finalAuth from '../Middleware/FinalStudentAuth.js'
import webAdminAuth from '../Middleware/WebAdminAuth.js'



const router = express.Router()


router.route('/all-courses')
   .get(getAllCourses)
   .post(webAdminAuth, addCourse)

router.route('/all-courses/:course_slug')
   .put(webAdminAuth, webAdminAuth, editCourse)
   .delete(webAdminAuth, webAdminAuth, deleteCourse)

router.post('/all-courses/user-courses', finalAuth, getSortedUserCourse)


export default router