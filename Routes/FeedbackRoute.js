import express from 'express'

import webAdminAuth from '../Middleware/WebAdminAuth.js'
import Feedback from '../Models/FeedbackModel.js'

const router = express.Router()


router.route('/all-feedback')
   // @route    GET /webminar/all-feedback
   // @desc    Get all feedbacks
   // @access  Private Admin 
   .get(webAdminAuth, async (req, res) => {
      try {
         let allFeedbacks = await Feedback.find().sort({ updatedAt: -1 })
         res.json({
            success: true,
            count: allFeedbacks.length,
            msg: allFeedbacks
         })
      } catch (error) {
         return res.status(500).json({
            success: false,
            msg: error.message
         })
      }
   })
   // @route    POST /webminar/all-feedback
   // @desc    User Share their view
   // @access  Public
   .post(async (req, res) => {
      try {
         let { name, email, telephone, message } = req.body

         if (!name) return res.status(400).json({
            msg: "Name is required"
         })
         if (!email) return res.status(400).json({
            msg: "Email is required"
         })
         if (!message) return res.status(400).json({
            msg: "Message is required"
         })
         let newMessage = new Feedback({ name, email, telephone, message })
         await newMessage.save()
         res.json({
            success: true,
            msg: `Thanks for your feedback, ${name}...`
         })
      } catch (error) {
         console.log(error.message);
         return res.status(500).json({
            success: false,
            msg: error.message
         })
      }
   })

export default router