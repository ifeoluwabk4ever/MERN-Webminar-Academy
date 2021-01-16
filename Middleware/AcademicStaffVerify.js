import AcademicStaff from '../Models/AcademicStaffModel.js'

const AuthAcademicStaff = async (req, res, next) => {
   try {
      // Get User info by id
      let user = await AcademicStaff.findById(req.academicStaff.id)

      if (user.role !== 'AcademicStaff') return res.status(400).json({
         msg: "Invalid Authentication, AcademicStaff resources!!!"
      })

      next()
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


export default AuthAcademicStaff