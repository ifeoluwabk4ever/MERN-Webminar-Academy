import express from 'express'

import { addFaculty, deleteFaculty, editFaculty, getFaculty } from '../Controllers/FacultyController.js'
import webAdminAuth from '../Middleware/WebAdminAuth.js'


const router = express.Router()


router.route('/all-faculty')
   .get(getFaculty)
   .post(webAdminAuth, addFaculty)

router.route('/all-faculty/:faculty_slug')
   .put(webAdminAuth, editFaculty)
   .delete(webAdminAuth, deleteFaculty)



export default router