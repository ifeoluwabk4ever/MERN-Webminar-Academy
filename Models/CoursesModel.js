import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

const { ObjectId } = mongoose.Schema
mongoose.plugin(slug)


const CoursesSchema = new mongoose.Schema({
   course_code: {
      type: String,
      unique: true,
      required: true,
      trim: true,
   },
   course_slug: {
      type: String,
      slug: 'course_code',
      unique: true,
      slug_padding_size: 3
   },
   course_title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
   },
   isFacultyCourse: {
      type: Boolean,
      default: false
   },
   isGeneralCourse: {
      type: Boolean,
      default: false
   },
   course_unit: {
      type: Number,
      required: true,
      trim: true
   },
   level: {
      type: Number,
      required: true,
      trim: true
   },
   semester: {
      type: String,
      required: true,
      trim: true
   },
   department: {
      type: ObjectId,
      required: true,
      ref: 'Department'
   },
   faculty: {
      type: ObjectId,
      required: true,
      ref: 'Faculty'
   }
}, { timestamps: true })

export default mongoose.model('Course', CoursesSchema)