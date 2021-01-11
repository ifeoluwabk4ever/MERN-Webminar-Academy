import UserInital from '../Models/StudentInitialRegistrationModel.js'

const AuthUtmeScreening = async (req, res, next) => {
   try {
      // Get User info by id
      let user = await UserInital.findById(req.initialStudent.id)

      if (user.role !== 'UtmeScreening') return res.status(400).json({
         msg: "Invalid Authentication, UtmeScreening resources!!!"
      })

      next()
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


export default AuthUtmeScreening