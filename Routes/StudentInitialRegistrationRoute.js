import express from 'express'


import initialAuth from '../Middleware/InitialStudentAuth.js'
import { InitialNewLoginUser, getInitialUser, InitialNewRegister, addTestUpdate, InitialLoginUser } from '../Controllers/StudentInitialController.js'


const router = express.Router()

router.post('/register', InitialNewRegister)

router.post('/login', InitialNewLoginUser)

router.post('/login-normal', InitialLoginUser)

router.get('/info', initialAuth, getInitialUser)

router.patch('/add-test-update', initialAuth, addTestUpdate)

export default router