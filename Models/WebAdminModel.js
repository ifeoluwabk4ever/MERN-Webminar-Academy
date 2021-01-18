import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)


const WebAdminSchema = new mongoose.Schema({
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
   },
   dob: {
      type: Date,
      required: true,
   },
   adminID: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   role: {
      type: String,
      default: 'WebAdmin'
   }
}, { timestamps: true })

export default mongoose.model('WebAdmin', WebAdminSchema)