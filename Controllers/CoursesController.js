import Courses from '../Models/CoursesModel.js'
import Department from '../Models/DepartmentModel.js'
// import Faculty from '../Models/FacultyModel.js'


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