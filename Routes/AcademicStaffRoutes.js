import express from 'express'

import academicStaffAuth from '../Middleware/AcademicStaffAuth.js'
import AuthAcademicStaff from '../Middleware/AcademicStaffVerify.js'
import { getAcademicStaffDetail, loginStaff, registerStaff } from '../Controllers/AcademicStaffController.js'


const router = express.Router()


router.post('/register', registerStaff)

router.post('/login', loginStaff)

router.get('/staff-info', academicStaffAuth, AuthAcademicStaff, getAcademicStaffDetail)



export default router