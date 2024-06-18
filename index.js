import express from "express"
import blog from "./routes/blogs.js"
import admin from "./routes/admin.js"
import mongoose from "mongoose"
import Blog from "./models/Blog.js"

mongoose.connect(process.env.MONGO_URI)

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/blogs', blog)
app.use('/admin', admin)

app.get('/', async(req, res)=>{
    const latestBlog = await Blog.findOne({ visibility: 'public' }).sort({ _id: -1 })
    latestBlog.blogBody = latestBlog.blogBody.split("").slice(0, 200).join("")

    const popularBlogs= await Blog.find({visibility: "public"}).sort({ views: -1 }).limit(3).select('slug title author date')
    res.render('index', {latestBlog, popularBlogs})
})

app.get('/about', (req, res)=>{
    res.render('about')
})

app.listen(port, ()=>{
    console.log(`App is listening at localhost:${port}`)
})