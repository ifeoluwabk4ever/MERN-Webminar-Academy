import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)

const FacultySchema = new mongoose.Schema({
   faculty_name: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   faculty_code: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   faculty_slug: {
      type: String,
      slug: 'faculty_name',
      unique: true,
   }
}, { timestamps: true })

export default mongoose.model('Faculty', FacultySchema)