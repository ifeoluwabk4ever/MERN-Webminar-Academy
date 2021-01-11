import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)

const StudentRegsitrationSchema = new mongoose.Schema({
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
   email: {
      type: String,
      trim: true,
      unique: true,
      required: true
   },
   passcode: {
      type: String,
      trim: true,
      required: true,
      minlength: 6
   },
   telephone: {
      type: String,
      default: null
   },
   dob: {
      type: Date,
      default: 'Nil',
   },
   regID: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   testScore: {
      type: Object,
      default: {}
   },
   hadTest: {
      type: Boolean,
      default: false
   },
   role: {
      type: String,
      default: 'UtmeScreening'
   }
}, { timestamps: true })

export default mongoose.model('StudentReg', StudentRegsitrationSchema)