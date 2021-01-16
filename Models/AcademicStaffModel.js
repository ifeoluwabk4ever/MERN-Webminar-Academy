import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)
const { ObjectId } = mongoose.Schema


const AcademicStaffSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      trim: true
   },
   lastName: {
      type: String,
      required: true,
      trim: true
   },
   fullName: {
      type: String,
      required: true,
      trim: true
   },
   user_slug: {
      type: String,
      slug: 'fullName',
      unique: true,
      slug_padding_size: 3
   },
   avatar: {
      type: String,
      required: true
   },
   schoolMail: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   password: {
      type: String,
      trim: true,
      required: true,
      minlength: 6
   },
   telephone: {
      type: String,
      required: true,
      default: null
   },
   dob: {
      type: Date,
      required: true,
      default: 'Nil',
   },
   staffID: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   level: {
      type: Number,
      required: true,
      trim: true
   },
   role: {
      type: String,
      default: 'AcademicStaff'
   },
   isRegistered: {
      type: Boolean,
      default: true
   },
   department: {
      type: ObjectId,
      ref: 'Department',
      required: true,
      trim: true
   },
   dept_name: {
      type: String,
      required: true,
      trim: true
   },
   dept_code: {
      type: String,
      required: true,
      trim: true
   }
},
   { timestamps: true }
)

export default mongoose.model('AcademicStaff', AcademicStaffSchema)