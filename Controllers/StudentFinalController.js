import UserFinal from '../Models/StudentFinalRegistrationModel.js'
import UserInital from '../Models/StudentInitialRegistrationModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// @route   POST /api/full-student/login
// @desc    Register new student user
// @access  Public
export const FinalStudentRegister = async (req, res) => {
   try {
      let reqUser = await UserInital.findById({ _id: req.initialStudent.id })

      let { firstName, lastName, fullName, email, telephone, dob, _id, avatar, hadTest, testScore, regID } = reqUser

      let { password, isDE } = req.body

      if (!hadTest) return res.status(400).json({
         msg: "Invalid access, you haven't had your test"
      })

      if (!testScore.isPassed) return res.status(400).json({
         msg: "Oops, you didn't pass your test"
      })

      if (!password) return res.status(400).json({
         msg: "Password required"
      })

      var DEStudent = isDE ? true : false
      var regIDLink = _id


      // Check for existing user
      let user = await UserFinal.findOne({ regID })
      if (user) return res.status(400).json({
         msg: 'User already exist'
      })

      if (password.length < 6) return res.status(400).json({
         msg: "Password too weak, 6 characters and above"
      })

      var level = DEStudent ? level = 2 : level = 1
      let fetchedserialNo = await getSerialNo()
      let serialNo = Number(fetchedserialNo)
      let matricNo = getMatricNo(fetchedserialNo)
      let schoolMail = getSchoolMail(lastName, firstName, fetchedserialNo)

      let newUser = new UserFinal({ firstName, lastName, fullName, email, telephone, dob, regID, avatar, password, DEStudent, level, serialNo, matricNo, schoolMail, regIDLink })

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
         msg: `Welcome ${newUser.lastName}`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @route   POST /api/full-student/login
// @desc    Login user
// @access  Public
export const FinalStudentLogin = async (req, res) => {
   try {
      // get email and password from req body
      let { matricNo, password } = req.body

      if (!matricNo) return res.status(400).json({
         msg: "Matric Number required...."
      })

      if (!password) return res.status(400).json({
         msg: "Password required...."
      })

      // Find user
      let user = await UserFinal.findOne({ matricNo })

      // If no user in db
      if (!user) return res.status(400).json({
         msg: 'User does not exist...'
      })

      // Know user found by email, comparing password
      let isMatch = await bcrypt.compare(password, user.password)

      // If error
      if (!isMatch) return res.status(400).json({
         msg: 'Invalid password...'
      })


      // If login success, create accesstoken and refreshtoken
      const accesstoken = createAccessToken({ id: user._id })

      res.json({
         token: accesstoken,
         msg: `Welcome ${user.lastName}`
      })
   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         msg: error.message
      })
   }
}


// @route   GET /api/full-student/student-info
// @desc    Get Each User Information
// @access  Private User
export const getFinalUser = async (req, res) => {
   try {
      let user = await UserFinal.findById(req.finalStudent.id)
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
   return jwt.sign(user, process.env.Jwt_Secret_Final_Student, { expiresIn: '2h' })
}

export const getSerialNo = async () => {
   try {
      let userInit = await UserFinal.find()
      let maxSerial = userInit.map(item => item.serialNo)
      let initSerial = maxSerial.length === 0 ? 0 : Math.max(...maxSerial.map(item => item))
      let finalSerial = initSerial + 1
      var serial

      if (finalSerial >= 1 && finalSerial <= 9) {
         return serial = `000` + finalSerial
      } else if (finalSerial >= 10 && finalSerial <= 99) {
         return serial = `00` + finalSerial
      } else if (finalSerial >= 100 && finalSerial <= 999) {
         return serial = `0` + finalSerial
      } else {
         return serial = finalSerial
      }

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: error.message
      })
   }
}

export const getMatricNo = serialNo => {
   let YearValue = new Date().getFullYear().toString()
   let YearString = YearValue.substr(2)

   return YearString + serialNo
}

export const getSchoolMail = (lastName, firstName, serialNo) => {
   let finalValue = `${firstName.toLowerCase()}${lastName.toLowerCase()}${serialNo}@webminar.edu.ng`

   return finalValue
}