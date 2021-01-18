import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


import WebAdmin from '../Models/WebAdminModel.js'
import { getAddedValue, getStaffID } from './AcademicStaffController.js'




// @route   POST /webminar/admin/register
// @desc    Register Admin
// @access  Public
export const registerAdmin = async (req, res) => {
   try {
      let { firstName, lastName, email, telephone, dob, password } = req.body

      if (!firstName || !lastName) return res.status(400).json({
         msg: "Name is required"
      })

      if (!email) return res.status(400).json({
         msg: "Email is required"
      })
      if (!telephone) return res.status(400).json({
         msg: "Mobile Number is required"
      })
      if (!dob) return res.status(400).json({
         msg: "Date of birth is required"
      })

      if (!password) return res.status(400).json({
         msg: "Password is required"
      })

      if (password.length < 6) return res.status(400).json({
         msg: "Password too weak, 6 characters and above"
      })

      let checkEmail = await WebAdmin.findOne({ email })

      if (checkEmail) return res.status(400).json({
         msg: `Email exists...`
      })

      let fullName = `${lastName} ${firstName}`

      let fetchedserialNo = await getSerialNo('ADMIN')
      let adminID = getStaffID('ADMIN', fetchedserialNo)
      let schoolMail = await getSchoolMail(lastName, firstName, Number(fetchedserialNo))

      let newUser = new WebAdmin({ firstName, lastName, fullName, email, telephone, dob, adminID, password, schoolMail })

      // Create salt && hash
      // Encrypt password
      let salt = await bcrypt.genSalt(10)
      // Save password
      newUser.password = await bcrypt.hash(password, salt)
      // Save data in database
      await newUser.save()

      // Create jwt to auth
      const accesstoken = createAccessToken({ id: newUser._id })

      res.json({
         token: accesstoken,
         msg: `Welcome Admin, ${newUser.lastName}`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @route   POST /webminar/admin/login
// @desc    Login Admin
// @access  Public
export const loginAdmin = async (req, res) => {
   try {
      // get adminID and password from req body
      let { adminID, password } = req.body

      if (!adminID) return res.status(400).json({
         msg: "Admin ID required...."
      })

      if (!password) return res.status(400).json({
         msg: "Password required...."
      })

      // Find user
      let user = await WebAdmin.findOne({ adminID })

      // If no user in db
      if (!user) return res.status(400).json({
         msg: 'User does not exist...'
      })

      // Know user found by adminID, comparing password
      let isMatch = await bcrypt.compare(password, user.password)

      // If error
      if (!isMatch) return res.status(400).json({
         msg: 'Invalid password...'
      })


      // If login success, create accesstoken
      const accesstoken = createAccessToken({ id: user._id })

      res.json({
         token: accesstoken,
         msg: `Welcome Admin, ${user.lastName}`
      })
   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         msg: error.message
      })
   }
}


// @route   GET /webminar/admin/admin-info
// @desc    Get Each Admin Information
// @access  Private Admin
export const getAdminDetail = async (req, res) => {
   try {
      let user = await WebAdmin.findById(req.webAdmin.id).select('-password')
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
   return jwt.sign(user, process.env.Jwt_Secret_Admin, { expiresIn: '2h' })
}

export const getSchoolMail = async (lastName, firstName, serialNo) => {
   let initValue = `${firstName.toLowerCase().replace(/( | - | _)/g, '')}${lastName.toLowerCase().replace(/( | - | _)/g, '')}${serialNo}@admin.webminar.edu.ng`

   let checkMail = await WebAdmin.find()
   let checkMail2 = checkMail.find(item => item.schoolMail === initValue)

   if (!checkMail2) {
      return initValue
   } else {
      let semi = getAddedValue()
      return `${firstName.toLowerCase().replace(/( | - | _)/g, '')}${lastName.toLowerCase().replace(/( | - | _)/g, '')}${semi}${serialNo}@staff.webminar.edu.ng`
   }
}

export const getSerialNo = async dept => {
   try {
      let userInit = await WebAdmin.find()
      let maxSerial = userInit.map(item => dept === item.adminID.substring(0, 5) && Number(item.adminID.substr(8)))
      let initSerial = maxSerial.length === 0 ? 0 : Math.max(...maxSerial.map(item => item))
      let finalSerial = initSerial + 1
      var serial

      if (finalSerial >= 1 && finalSerial <= 9) {
         return serial = `00` + finalSerial
      }

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: error.message
      })
   }
}