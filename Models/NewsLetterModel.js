import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)


const NewsLetterSchema = new mongoose.Schema({
   mainImage: {
      type: String,
      required: true
   },
   otherImages: {
      type: [String],
      default: []
   },
   headline: {
      type: String,
      required: true,
      trim: true
   },
   news_slug: {
      type: String,
      unique: true,
      slug: 'headline',
      slug_padding_size: 3
   },
   author: {
      type: String,
      required: true,
      trim: true
   },
   storyline: {
      type: String,
      required: true,
      trim: true
   }
}, { timestamps: true })

export default mongoose.model('NewsLetter', NewsLetterSchema)