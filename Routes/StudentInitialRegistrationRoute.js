import express from 'express'


import InitialAuth from '../Middleware/InitalStudentAuth.js'
import { InitialNewLoginUser, getInitialUser, InitialNewRegister, addTestUpdate } from '../Controllers/StudentInitialController.js'


const router = express.Router()

router.post('/register', InitialNewRegister)

router.post('/login', InitialNewLoginUser)

router.get('/info', InitialAuth, getInitialUser)

router.patch('/add-test-update', InitialAuth, addTestUpdate)

export default router