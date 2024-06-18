import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    title : {type: String, require: true},
    slug: {type: String, require: true},
    author : {type: String, require: true},
    visibility: {type: String, require: true},
    coverImg: {type: String, require: true},
    blogBody: {type: String, require: true},
    date: { type: Date, default: Date.now, get: formatDate },
    views: {type: Number, default: 0}
})

function formatDate(date) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
        'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  }

  
const Blog = mongoose.model('Blog', blogSchema)
export default Blog