import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)



const FeedbackSchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
      required: true
   },
   name_slug: {
      type: String,
      slug: 'name',
      slug_padding_size: 3,
      unique: true
   },
   message: {
      type: String,
      required: true,
      trim: true
   },
   email: {
      type: String,
      required: true,
      trim: true
   },
   telephone: {
      type: Number,
      default: null,
      trim: true
   }
}, { timestamps: true })

export default mongoose.model("Feedback", FeedbackSchema)