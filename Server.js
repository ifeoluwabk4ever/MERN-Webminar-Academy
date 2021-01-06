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
import StudentFinalRoute from './Routes/StudentInitialRegistrationRoute.js'
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



// Routes
app.use('/api/new-student', StudentInitialRoute)
app.use('/api/full-student', StudentFinalRoute)
app.use('/api', ImageUpload)

// Page not found
app.use((req, res) => {
   res.status(400).json({
      msg: `Page not found`
   })
})

const PORT = process.env.PORT || process.env.PORT_NUMBER

connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`Server running on port:${PORT}`.white.bgBlue.dim);
   })
})