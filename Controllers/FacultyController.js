import Faculty from '../Models/FacultyModel.js'


// @desc    Get all Faculty
// @route   GET /webminar/all-faculty
// @access  Public
export const getFaculty = async (req, res) => {
   try {
      let allFaculty = await Faculty.find().sort({ updatedAt: -1 })
      res.json({
         success: true,
         count: allFaculty.length,
         allFaculty
      })
   } catch (error) {
      return res.status(500).json({
         success: false,
         msg: error.message
      })
   }
}


// @desc    add all Faculty
// @route   POST /webminar/all-faculty
// @access  Private Admin
export const addFaculty = async (req, res) => {
   try {
      let { faculty_name, faculty_code } = req.body

      if (!faculty_name) return res.status(400).json({
         msg: "Faculty name required..."
      })

      if (!faculty_code) return res.status(400).json({
         msg: "Faculty code required..."
      })

      let checkFaculty = await Faculty.findOne({ faculty_name })

      if (checkFaculty) return res.status(400).json({
         msg: `Faculty, '${faculty_name}' exist...`
      })

      let checkFacultyCode = await Faculty.findOne({ faculty_code })

      if (checkFacultyCode) return res.status(400).json({
         msg: `Faculty Code, '${faculty_code}' exist...`
      })

      let newFaculty = new Faculty({ faculty_name, faculty_code })
      await newFaculty.save()
      res.json({
         msg: `Faculty, '${faculty_code}' created...`
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @desc    update all Faculty
// @route   PUT /webminar/all-faculty:faculty_slug
// @access  Private Admin
export const editFaculty = async (req, res) => {
   try {
      let { faculty_slug } = req.params
      let findFaculty = await Faculty.findOne({ faculty_slug })
      if (!findFaculty) return res.status(400).json({
         msg: `Faculty '${faculty_slug}' not found`
      })

      let { faculty_name } = req.body
      if (!faculty_name) return res.json({
         msg: "Please provided what to update with???"
      })
      await Faculty.findOneAndUpdate({ faculty_slug }, { faculty_name })
      res.json({
         msg: `Faculty '${faculty_name}' updated`
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @desc    delete all Faculty
// @route   DELETE /webminar/all-faculty:faculty_slug
// @access  Private Admin
export const deleteFaculty = async (req, res) => {
   try {
      let { faculty_slug } = req.params
      let findFaculty = await Faculty.findOne({ faculty_slug })
      if (!findFaculty) return res.status(400).json({
         msg: `Faculty '${faculty_slug}' not found`
      })

      await Faculty.findOneAndDelete({ faculty_slug })
      res.json({
         msg: `Faculty '${findFaculty.faculty_name}' deleted`
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}