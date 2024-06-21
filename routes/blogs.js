import express from "express"
import Blogs from "../models/Blog.js"
const blogs = express.Router()

blogs.use(express.static('public'))

blogs.get('/', async(req, res)=>{
    const blogs = await Blogs.find({visibility: "public"}).sort({_id: -1 })
    blogs.forEach(e=>{
        e.blogBody = e.blogBody.split("").slice(0, 200).join("")      
    })
    res.render('blogs', {blogs})
})

blogs.get('/:slug', async(req, res)=>{
    try{
        const blog = await Blogs.findOne({slug: req.params.slug, visibility: "public"})    
        await Blogs.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
        const latestBlogs = await Blogs.find({visibility: "public"}, 'title slug coverImg').sort({_id: -1 }).limit(3)
        res.render('blogpost', {blog, latestBlogs})
    }
    catch(e){
        res.render('404')
    }
})

export default blogs
