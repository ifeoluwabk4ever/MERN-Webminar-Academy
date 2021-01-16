import express from 'express'

import { addDepartment, deleteDepartment, editDepartment, getDepartment } from '../Controllers/DepartmentController.js'


const router = express.Router()


router.route('/all-department')
   .get(getDepartment)
   .post(addDepartment)

router.route('/all-department/:course_slug')
   .put(editDepartment)
   .delete(deleteDepartment)



export default router