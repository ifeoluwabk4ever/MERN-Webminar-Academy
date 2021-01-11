import UserFinal from '../Models/StudentFinalRegistrationModel.js'

const AuthUndergraduate = async (req, res, next) => {
   try {
      // Get User info by id
      let user = await UserFinal.findById(req.finalStudent.id)

      if (user.role !== 'Undergraduate') return res.status(400).json({
         msg: "Invalid Authentication, Undergraduate resources!!!"
      })

      next()
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


export default AuthUndergraduate