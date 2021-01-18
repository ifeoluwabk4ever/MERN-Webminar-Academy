import AcademicStaff from '../Models/AcademicStaffModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Department from '../Models/DepartmentModel.js'


// @route   POST /webminar/academic-staff/register
// @desc    Register staff
// @access  Public
export const registerStaff = async (req, res) => {
   try {
      let { firstName, lastName, email, telephone, dob, password, avatar, department } = req.body

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
      if (!avatar) return res.status(400).json({
         msg: "Passport photograph is required"
      })
      if (!department) return res.status(400).json({
         msg: "Department is required"
      })

      if (!password) return res.status(400).json({
         msg: "Password is required"
      })

      if (password.length < 6) return res.status(400).json({
         msg: "Password too weak, 6 characters and above"
      })

      let checkEmail = await AcademicStaff.findOne({ email })

      if (checkEmail) return res.status(400).json({
         msg: `Email exists...`
      })

      let fullName = `${lastName} ${firstName}`
      var level = 1

      let checkDepartment = await Department.findById(department)

      if (!checkDepartment) return res.status(400).json({
         msg: `Department does not exist`
      })

      let dept_name = checkDepartment.department
      let dept_code = checkDepartment.course_code

      let fetchedserialNo = await getSerialNo(dept_code)
      let staffID = getStaffID(dept_code, fetchedserialNo)
      let schoolMail = await getSchoolMail(lastName, firstName, Number(fetchedserialNo))

      let newUser = new AcademicStaff({ firstName, lastName, fullName, email, telephone, dob, staffID, avatar, password, level, staffID, schoolMail, department, dept_name, dept_code })

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


// @route   POST /webminar/academic-staff/login
// @desc    Login staff
// @access  Public
export const loginStaff = async (req, res) => {
   try {
      // get email and password from req body
      let { staffID, password } = req.body

      if (!staffID) return res.status(400).json({
         msg: "Matric Number required...."
      })

      if (!password) return res.status(400).json({
         msg: "Password required...."
      })

      // Find user
      let user = await AcademicStaff.findOne({ staffID })

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


// @route   GET /webminar/academic-staff/staff-info
// @desc    Get Each User Information
// @access  Private User
export const getAcademicStaffDetail = async (req, res) => {
   try {
      let user = await AcademicStaff.findById(req.academicStaff.id).select('-password')
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
   return jwt.sign(user, process.env.Jwt_Secret_Academic_Staff, { expiresIn: '2h' })
}

export const getAddedValue = () => {
   let values = ['a', 'b', 'c', 'd', 'e', 'f']
   var numb = []
   for (let i = 1; i <= 3; i++) {
      let randomIndex = Math.floor(Math.random() * values.length)
      numb.push(values[randomIndex])
   }
   var semi = numb.reduce((r, a) => {
      return r += a
   }, '')
   let finalValue = `${semi}`
   return finalValue
}


export const getSchoolMail = async (lastName, firstName, serialNo) => {
   let initValue = `${firstName.toLowerCase().replace(/( | - | _)/g, '')}${lastName.toLowerCase().replace(/( | - | _)/g, '')}${serialNo}@staff.webminar.edu.ng`

   let checkMail = await AcademicStaff.find()
   let checkMail2 = checkMail.find(item => item.schoolMail === initValue)

   if (!checkMail2) {
      return initValue
   } else {
      let semi = getAddedValue()
      return `${firstName.toLowerCase().replace(/( | - | _)/g, '')}${lastName.toLowerCase().replace(/( | - | _)/g, '')}${semi}${serialNo}@staff.webminar.edu.ng`
   }
}

// var testArr = ['CSE-21001', 'CSE-21011', 'CSE-21101', 'CSE-21006', 'CSE-21020', 'FSE-21001', 'MEE-21011', 'FSE-21101', 'CHE-21006', 'AGE-21020', 'EEE-21001', 'MEE-21011', 'CHE-21101', 'EEE-21006', 'AGE-21045']

export const getSerialNo = async dept => {
   try {
      let userInit = await AcademicStaff.find()
      let maxSerial = userInit.map(item => dept === item.staffID.substring(0, 3) && Number(item.staffID.substr(6)))
      // let maxSerial = testArr.map(item => dept === item.substring(0, 3) && Number(item.substr(6)))
      let initSerial = maxSerial.length === 0 ? 0 : Math.max(...maxSerial.map(item => item))
      let finalSerial = initSerial + 1
      var serial
      // console.log(maxSerial, initSerial, finalSerial);

      if (finalSerial >= 1 && finalSerial <= 9) {
         return serial = `00` + finalSerial
      } else if (finalSerial >= 10 && finalSerial <= 99) {
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

// getSerialNo('CSE')


export const getStaffID = (dept, serialNo) => {
   let YearValue = new Date().getFullYear().toString()
   let YearString = YearValue.substr(2)

   return `${dept}-${YearString}${serialNo}`
}