import express from 'express'

import { getAdminDetail, loginAdmin, registerAdmin } from '../Controllers/WebAdminController.js'
import webAdmin from '../Middleware/WebAdminAuth.js'



const router = express.Router()


router.post('/register', registerAdmin)

router.post('/login', loginAdmin)

router.get('/admin-info', webAdmin, getAdminDetail)


export default router