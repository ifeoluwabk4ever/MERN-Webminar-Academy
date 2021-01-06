import express from 'express'


import { FinalStudentRegister } from '../Controllers/StudentFinalController.js'



const router = express.Router()


router.post('/register', FinalStudentRegister)



export default router