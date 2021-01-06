import UserInitial from '../Models/StudentInitialRegistrationModel.js'
import UserFinal from '../Models/StudentFinalRegistrationModel.js'



export const FinalStudentRegister = async (req, res) => {

}


const createAccessToken = user => {
   return jwt.sign(user, process.env.Jwt_Secret_Final_Student, { expiresIn: '2h' })
}


export const getSchoolMail = (name, matric) => {
   let MatricString = matric.toString().substr(2)
   let finalValue = `${name}${MatricString}@webminar.edu.ng`

   return finalValue
}