import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)


const WebAdminSchema = new mongoose.Schema({}, { timestamps: true })

export default mongoose.model('WebAdmin', WebAdminSchema)