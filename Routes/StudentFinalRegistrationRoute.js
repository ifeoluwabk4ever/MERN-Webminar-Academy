import express from 'express'


import initialAuth from '../Middleware/InitialStudentAuth.js'
import finalAuth from '../Middleware/FinalStudentAuth.js'
import AuthUndergraduate from '../Middleware/FinalStudentVerify.js'
import { FinalStudentRegister, FinalStudentLogin, getFinalUser } from '../Controllers/StudentFinalController.js'



const router = express.Router()


router.post('/register', initialAuth, FinalStudentRegister)

router.post('/login', FinalStudentLogin)

router.get('/student-info', finalAuth, AuthUndergraduate, getFinalUser)




export default router