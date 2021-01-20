import express from 'express'

import { addDepartment, deleteDepartment, editDepartment, getDepartment } from '../Controllers/DepartmentController.js'
import webAdminAuth from '../Middleware/WebAdminAuth.js'



const router = express.Router()


router.route('/all-department')
   .get(getDepartment)
   .post(webAdminAuth, addDepartment)

router.route('/all-department/:course_slug')
   .put(webAdminAuth, editDepartment)
   .delete(webAdminAuth, deleteDepartment)



export default router