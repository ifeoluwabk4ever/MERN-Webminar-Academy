import express from 'express'


import initialAuth from '../Middleware/InitialStudentAuth.js'
import AuthUtmeScreening from '../Middleware/InitialStudentVerify.js'
import { InitialNewLoginUser, getInitialUser, InitialNewRegister, addTestUpdate, InitialLoginUser } from '../Controllers/StudentInitialController.js'


const router = express.Router()

router.post('/register', InitialNewRegister)

router.post('/login', InitialNewLoginUser)

router.post('/login-normal', InitialLoginUser)

router.get('/info', initialAuth, AuthUtmeScreening, getInitialUser)

router.patch('/add-test-update', initialAuth, AuthUtmeScreening, addTestUpdate)

export default router