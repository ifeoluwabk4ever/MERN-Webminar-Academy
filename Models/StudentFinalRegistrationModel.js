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
   password: {
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
      type: ObjectId,
      required: true,
      unique: true,
      trim: true,
      ref: 'StudentReg'
   },
   matricNo: {
      type: Number,
      required: true,
      trim: true,
      unique: true
   },
   level: {
      type: Number,
      required: true,
      trim: true

   }
},
   { timestamps: true }
)

export default mongoose.model('StudentMainReg', StudentMainRegsitrationSchema)