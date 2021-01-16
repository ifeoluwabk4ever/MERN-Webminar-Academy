import express from 'express'

import { addFaculty, deleteFaculty, editFaculty, getFaculty } from '../Controllers/FacultyController.js'


const router = express.Router()


router.route('/all-faculty')
   .get(getFaculty)
   .post(addFaculty)

router.route('/all-faculty/:faculty_slug')
   .put(editFaculty)
   .delete(deleteFaculty)



export default router