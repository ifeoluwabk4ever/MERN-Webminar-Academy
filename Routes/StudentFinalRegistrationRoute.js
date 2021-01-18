import express from 'express'


import initialAuth from '../Middleware/InitialStudentAuth.js'
import finalAuth from '../Middleware/FinalStudentAuth.js'
import { FinalStudentRegister, FinalStudentLogin, getFinalUser, FinalStudentRegisterCourse } from '../Controllers/StudentFinalController.js'



const router = express.Router()


router.post('/register', initialAuth, FinalStudentRegister)

router.post('/login', FinalStudentLogin)

router.get('/student-info', finalAuth, getFinalUser)

router.patch('/register-course', finalAuth, FinalStudentRegisterCourse)




export default router