import express from 'express'

import { addCourse, getAllCourses } from '../Controllers/CoursesController.js'


const router = express.Router()


router.route('/all-courses')
   .get(getAllCourses)
   .post(addCourse)


export default router