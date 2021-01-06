import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserInitial from '../Models/StudentInitialRegistrationModel.js'


// @route   POST /api/new-users/register
// @desc    Register new user
// @access  Public 
export const InitialNewRegister = async (req, res) => {
   try {
      let { firstName, lastName, email, telephone, dob, avatar } = req.body

      if (!firstName || !lastName) return res.status(400).json({
         msg: "Please supply your name"
      })

      if (!avatar) return res.status(400).json({
         msg: "Passport photogragh needed"
      })

      if (!email) return res.status(400).json({
         msg: "Email is required"
      })

      // Check for existing user
      let user = await UserInitial.findOne({ email })
      if (user) return res.status(400).json({
         msg: 'Email exist'
      })

      let fullName = `${lastName} ${firstName}`
      var regID = getRegID()

      let dbreg = await UserInitial.findOne({ regID })
      if (dbreg) {
         regID = getRegID()
      }

      let passcode = getUniquePasscode()

      let newUser = new UserInitial({ firstName, lastName, fullName, email, passcode, telephone, dob, regID, avatar })

      await newUser.save()

      // Create jwt to auth
      const accesstoken = createAccessToken({ id: newUser._id })

      res.json({
         token: accesstoken,
         msg: `Welcome ${newUser.firstName}`
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @route   POST /api/new-users/login
// @desc    Login user
// @access  Public
export const InitialNewLoginUser = async (req, res) => {
   try {
      // get regID and password from req body
      let { regID, passcode } = req.body

      if (!regID) return res.status(400).json({
         msg: "Registration number is required...."
      })

      if (!passcode) return res.status(400).json({
         msg: "Passcode required...."
      })

      // Find user
      let user = await UserInitial.findOne({ regID })

      // If no user in db
      if (!user) {
         return res.status(400).json({
            msg: 'User does not exist...'
         })
      }

      if (user.hadTest) {
         return res.status(400).json({
            msg: `${user.fullName} has taken her test`
         })
      }

      if (passcode !== user.passcode) {
         return res.status(400).json({
            msg: 'Passcode do not match...'
         })
      }

      // If login success, create accesstoken and refreshtoken
      const accesstoken = createAccessToken({ id: user._id })

      res.json({
         token: accesstoken,
         msg: `Welcome ${user.firstName}`
      })
   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         msg: error.message
      })
   }
}


// @desc    Add test detail to Database
// @route   PATCH /api/new-users/add-test-update
// @access  Private User
export const addTestUpdate = async (req, res) => {
   try {
      let user = await UserInitial.findById(req.initalStudent.id)
      if (!user) return res.status(400).json({
         msg: "User does not exist"
      })
      await UserInitial.findByIdAndUpdate({ _id: req.initalStudent.id }, {
         testScore: req.body.testScore,
         hadTest: req.body.hadTest
      })
      return res.json({
         msg: `Test detail updated`
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @route   GET /api/new-users/info
// @desc    Get Each User Information
// @access  Private User
export const getInitialUser = async (req, res) => {
   try {
      let user = await UserInitial.findById(req.initalStudent.id)
      if (!user) return res.status(400).json({
         msg: "User does not exist..."
      })

      res.json({ user })

   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}




const createAccessToken = user => {
   return jwt.sign(user, process.env.Jwt_Secret_Initial_Student, { expiresIn: '2h' })
}

export const getRegID = () => {
   let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'A', 'B', 'C', 'D', 'E', 'F']
   let YearValue = new Date().getFullYear().toString()
   let YearString = YearValue.substr(2)
   var numb = []
   for (let i = 1; i <= 8; i++) {
      let randomIndex = Math.floor(Math.random() * values.length)
      numb.push(values[randomIndex])
   }
   var semi = numb.reduce((r, a) => {
      return r += a
   }, '')
   let finalValue = `${YearString}${semi}`

   return finalValue
}

export const getUniquePasscode = () => {
   let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'A', 'B', 'C', 'D', 'E', 'F', 'a', 'b', 'c', 'd', 'e', 'f']
   var numb = []
   for (let i = 1; i <= 8; i++) {
      let randomIndex = Math.floor(Math.random() * values.length)
      numb.push(values[randomIndex])
   }
   var semi = numb.reduce((r, a) => {
      return r += a
   }, '')
   let finalValue = `${semi}`

   return finalValue
}