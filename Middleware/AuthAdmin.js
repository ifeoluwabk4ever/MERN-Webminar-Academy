import User from '../../Practical Shopping Cart/Models/UserModel.js'

const AuthAdmin = async (req, res, next) => {
   try {
      // Get User info by id
      let user = await User.findOne({ _id: req.user.id })

      if (user.role === 0) return res.status(400).json({
         msg: "Invalid Authentication, Admin resources!!!"
      })

      next()
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


export default AuthAdmin