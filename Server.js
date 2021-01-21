import dotenv from 'dotenv'
dotenv.config({
   path: './Config/config.env'
})
import express from 'express'
import 'colors'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'


// Import files
import connectDB from './Config/Db.js'
import StudentInitialRoute from './Routes/StudentInitialRegistrationRoute.js'
import StudentFinalRoute from './Routes/StudentFinalRegistrationRoute.js'
import AcademicStaffRoute from './Routes/AcademicStaffRoutes.js'
import WebAdminRoute from './Routes/WebAdminRoutes.js'
import FacultyRoute from './Routes/FacultyRoutes.js'
import DepartmentRoute from './Routes/DepartmentRoutes.js'
import CoursesRoute from './Routes/CoursesRoutes.js'
import NewsLetterRoute from './Routes/NewsLetterRoutes.js'
import FeedbackRoute from './Routes/FeedbackRoute.js'
import ImageUpload from './Routes/ImageUpload.js'


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

// Set Public Folder
// Neccesaries Middlewares
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'Public')))



// Webminar Routes
app.use('/webminar/new-student', StudentInitialRoute)
app.use('/webminar/full-student', StudentFinalRoute)
app.use('/webminar/academic-staff', AcademicStaffRoute)
app.use('/webminar/admin', WebAdminRoute)
app.use('/webminar', FacultyRoute)
app.use('/webminar', DepartmentRoute)
app.use('/webminar', CoursesRoute)
app.use('/webminar', NewsLetterRoute)
app.use('/webminar', FeedbackRoute)
app.use('/webminar', ImageUpload)


// Page not found
app.use((req, res) => {
   res.status(400).json({
      msg: `Route not found`
   })
})

const PORT = process.env.PORT || process.env.PORT_NUMBER

connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`Server running on port:${PORT}`.white.bgBlue.dim);
   })
})