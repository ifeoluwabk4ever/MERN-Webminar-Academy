import express from 'express'


import initialAuth from '../Middleware/InitialStudentAuth.js'
import finalAuth from '../Middleware/FinalStudentAuth.js'
import AuthUndergraduate from '../Middleware/FinalStudentVerify.js'
import { FinalStudentRegister, FinalStudentLogin, getFinalUser, FinalStudentRegisterCourse } from '../Controllers/StudentFinalController.js'



const router = express.Router()


router.post('/register', initialAuth, FinalStudentRegister)

router.post('/login', FinalStudentLogin)

router.get('/student-info', finalAuth, AuthUndergraduate, getFinalUser)

router.patch('/register-course', finalAuth, AuthUndergraduate, FinalStudentRegisterCourse)




export default router