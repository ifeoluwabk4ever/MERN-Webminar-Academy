import Department from '../Models/DepartmentModel.js'
import Faculty from '../Models/FacultyModel.js'


// @desc    Get all Department
// @route   GET /webminar/all-department
// @access  Public
export const getDepartment = async (req, res) => {
   try {
      let allDepartment = await Department.find().sort({ department: 1 })
      res.json({
         success: true,
         count: allDepartment.length,
         allDepartment
      })
   } catch (error) {
      return res.status(500).json({
         success: false,
         msg: error.message
      })
   }
}


// @desc    add all Department
// @route   POST /webminar/all-department
// @access  Private Admin
export const addDepartment = async (req, res) => {
   try {
      let { course, course_code, faculty } = req.body

      if (!course) return res.status(400).json({
         msg: "Department name required..."
      })

      if (!course_code) return res.status(400).json({
         msg: "Department code required..."
      })

      if (!faculty) return res.status(400).json({
         msg: "Faculty required..."
      })

      let checkDepartment = await Department.findOne({ course })

      if (checkDepartment) return res.status(400).json({
         msg: `Department, '${course}' exist...`
      })

      let checkDepartmentCode = await Department.findOne({ course_code })

      if (checkDepartmentCode) return res.status(400).json({
         msg: `Department Code, '${course_code}' exist...`
      })

      var checkFaculty = await Faculty.findById(faculty)

      if (!checkFaculty) return res.status(400).json({
         msg: `Faculty does not exist...`
      })

      let faculty_name = checkFaculty.faculty_name
      let department = `Department of ${course}`


      let newDepartment = new Department({ course, department, course_code, faculty, faculty_name })
      await newDepartment.save()
      res.json({
         msg: `Department, '${course_code}' created...`
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @desc    update all Department
// @route   PUT /webminar/all-department:course_slug
// @access  Private Admin
export const editDepartment = async (req, res) => {
   try {
      let { course_slug } = req.params
      let findDepartment = await Department.findOne({ course_slug })
      if (!findDepartment) return res.status(400).json({
         msg: `Department ${course_slug} not found`
      })

      let { course } = req.body
      if (!course) return res.json({
         msg: "Please provided what to update with???"
      })
      await Department.findOneAndUpdate({ course_slug }, { course })
      res.json({
         msg: `Department ${course} updated`,
         findDepartment
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @desc    delete all Department
// @route   DELETE /webminar/all-department:course_slug
// @access  Private Admin
export const deleteDepartment = async (req, res) => {
   try {
      let { course_slug } = req.params
      let findDepartment = await Department.findOne({ course_slug })
      if (!findDepartment) return res.status(400).json({
         msg: `Department ${course_slug} not found`
      })

      let resDept = await Department.findOneAndDelete({ course_slug })
      res.json({
         msg: `Department ${resDept.department} deleted`
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}