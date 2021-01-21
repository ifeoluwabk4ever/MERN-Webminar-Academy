import express from 'express'

import { getAllNewsLetter, addNewsLetter, editNewsLetter, deleteNewsLetter } from '../Controllers/NewsLetterController.js'
import webAdminAuth from '../Middleware/WebAdminAuth.js'


const router = express.Router()

router.route('/all-news')
   .get(getAllNewsLetter)
   .post(webAdminAuth, addNewsLetter)

router.route('/all-news/:news_slug')
   .put(webAdminAuth, editNewsLetter)
   .delete(webAdminAuth, deleteNewsLetter)



export default router