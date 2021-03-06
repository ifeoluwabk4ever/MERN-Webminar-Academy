import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)
const { ObjectId } = mongoose.Schema


const StudentMainRegsitrationSchema = new mongoose.Schema({
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
   regIDLink: {
      type: ObjectId,
      required: true,
      unique: true,
      trim: true,
      ref: 'StudentInitReg'
   },
   regID: {
      type: String,
      required: true,
      trim: true
   },
   matricNo: {
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
   DEStudent: {
      type: Boolean,
      default: false
   },
   role: {
      type: String,
      default: 'Undergraduate'
   },
   isRegistered: {
      type: Boolean,
      default: true
   },
   department: {
      type: ObjectId,
      required: true,
      ref: 'Department'
   },
   department_name: {
      type: String,
      required: true
   },
   course: {
      type: String,
      required: true
   },
   isCourseRegistered: {
      type: Boolean,
      default: false,
   },
   courseRegistered: {
      type: Array,
      default: []
   },
   isTuitionPaid: {
      type: Boolean,
      default: false,
   },
   tuitionPayment: {
      type: Array,
      default: []
   }
},
   { timestamps: true }
)

export default mongoose.model('StudentMainReg', StudentMainRegsitrationSchema)