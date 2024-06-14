import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    title : {type: String, require: true},
    slug: {type: String, require: true},
    author : {type: String, require: true},
    visibility: {type: String, require: true},
    coverImg: {type: String, require: true},
    blogBody: {type: String, require: true}
})

const Blog = mongoose.model('Blog', blogSchema)
export default Blog