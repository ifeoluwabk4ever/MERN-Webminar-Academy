import Courses from '../Models/CoursesModel.js'
import Department from '../Models/DepartmentModel.js'
import UserFinal from '../Models/StudentFinalRegistrationModel.js'


// @desc    Get all Courses
// @route   GET /webminar/all-courses
// @access  Public
export const getAllCourses = async (req, res) => {
   try {
      let allCourses = await Courses.find().sort({ updatedAt: -1 })
      res.json({
         success: true,
         count: allCourses.length,
         allCourses
      })
   } catch (error) {
      return res.status(500).json({
         success: false,
         msg: error.message
      })
   }
}



// @desc    add Courses
// @route   POST /webminar/all-courses
// @access  Private Admin
export const addCourse = async (req, res) => {
   try {
      let { course_code, course_title, course_unit, isFacultyCourse, isGeneralCourse, level, department, semester } = req.body

      if (!course_title) return res.status(400).json({
         msg: `Course title required`
      })

      if (!course_code) return res.status(400).json({
         msg: `Course code required`
      })

      if (!course_unit) return res.status(400).json({
         msg: `Course unit required`
      })

      if (!level) return res.status(400).json({
         msg: `Level required`
      })

      if (!semester) return res.status(400).json({
         msg: `Semester required`
      })

      if (!department) return res.status(400).json({
         msg: `Department required`
      })
      let checkDepartment = await Department.findById(department)

      if (!checkDepartment) return res.status(400).json({
         msg: `Department does not exist`
      })

      let faculty = checkDepartment.faculty

      let newCourse = new Courses({ course_title, course_unit, isFacultyCourse, isGeneralCourse, department, faculty, course_code, level, semester })
      await newCourse.save()
      res.json({
         msg: `Course, '${course_code}' created...`
      })

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         success: false,
         msg: error.message
      })
   }
}


// @desc    Get all Courses
// @route   GET /webminar/all-courses
// @access  Public
export const getSortedUserCourse = async (req, res) => {
   try {
      let { level, semester } = req.body
      let user = await UserFinal.findById(req.finalStudent.id)

      if (!level) return res.status(400).json({
         msg: `Level required`
      })
      if (!semester) return res.status(400).json({
         msg: `Semester required`
      })

      let user_course = user.department
      let allCourses = await Courses.find().sort({ course_code: 1 })
      let firstSort = allCourses.filter(item =>
         item.level === Number(level)
      )
      let secondSort = firstSort.filter(item =>
         semester === item.semester && item
      )
      let userCourse = secondSort.filter(item =>
         (user_course === item.department) || item.isGeneralCourse ? item : null
      )
      res.json({
         success: true,
         count: userCourse.length,
         userCourse
      })
   } catch (error) {
      return res.status(500).json({
         success: false,
         msg: error.message
      })
   }
}

// @desc    update all Course
// @route   PUT /webminar/all-courses:course_slug
// @access  Private Admin
export const editCourse = async (req, res) => {
   try {
      let { course_slug } = req.params
      let findCourse = await Courses.findOne({ course_slug })
      if (!findCourse) return res.status(400).json({
         msg: `Course ${course_slug} not found`
      })

      let { course } = req.body
      if (!course) return res.json({
         msg: "Please provided what to update with???"
      })
      await Courses.findOneAndUpdate({ course_slug }, { course })
      res.json({
         msg: `Course ${course} updated`,
         findCourse
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @desc    delete all Course
// @route   DELETE /webminar/all-courses:course_slug
// @access  Private Admin
export const deleteCourse = async (req, res) => {
   try {
      let { course_slug } = req.params
      let findCourse = await Courses.findOne({ course_slug })
      if (!findCourse) return res.status(400).json({
         msg: `Course ${course_slug} not found`
      })

      let resCourse = await Courses.findOneAndDelete({ course_slug })
      res.json({
         msg: `Course ${resCourse.course_title} deleted`
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}