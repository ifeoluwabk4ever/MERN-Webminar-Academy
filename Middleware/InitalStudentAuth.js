import jwt from 'jsonwebtoken'

const initialAuth = async (req, res, next) => {
   try {
      let token = req.header("x-auth-token")
      if (!token) return res.status(400).json({
         msg: "No token , authorization denied"
      })

      jwt.verify(token, process.env.Jwt_Secret, (err, user) => {
         if (err) return res.status(400).json({
            msg: "Invalid Authentication, Unauthorized User"
         })

         req.initalStudent = user
         next()
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}

export default initialAuth