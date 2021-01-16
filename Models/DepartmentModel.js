import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

const { ObjectId } = mongoose.Schema
mongoose.plugin(slug)

const DepartmentSchema = new mongoose.Schema({
   course: {
      type: String,
      unique: true,
      trim: true,
      required: true
   },
   department: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   course_code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      length: 3
   },
   course_slug: {
      type: String,
      slug: 'course',
      unique: true,
   },
   faculty: {
      type: ObjectId,
      ref: 'Faculty',
      required: true
   },
   faculty_name: {
      type: String,
      required: true,
      trim: true
   }
}, { timestamps: true })

export default mongoose.model('Department', DepartmentSchema)