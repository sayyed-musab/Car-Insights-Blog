import express from "express"
import Admin from "../models/Admin.js"
import Blog from "../models/Blog.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const admin = express.Router()

admin.use(express.static('public'))
admin.use(express.json({limit: '10mb'}))

admin.get('/', async(req, res)=>{
    const blogs = await Blog.find().sort({_id: -1 })
    blogs.forEach(e=>{
        e.blogBody = e.blogBody.split("").slice(0, 200).join("")      
    })
    res.render('dashboard', {blogs}) 
})

admin.get('/login', (req, res)=>{
    res.render('login')
})

admin.post('/login', async (req, res)=>{
    try{
        const adminData = await Admin.findOne({username: req.body.username})
        if(!adminData){
            res.json({err: 'Invalid Credentials'})
        }
        else{
            const isPwdCorrect = await bcrypt.compare(req.body.password, adminData.password)
            if(!isPwdCorrect){
                res.json({err: 'Invalid Credentials'})
            }
            else{
                let authToken = jwt.sign({ id: adminData._id}, process.env.JWT_PRIVATE_KEY)
                res.json({authToken})
            }
        }
    }
    catch(err){
        res.json({err: err.message})
    }
})

admin.post('/adminAuth', async(req, res)=>{
    try{
        let adminID = jwt.verify(req.body.authToken, process.env.JWT_PRIVATE_KEY)
        let admin = await Admin.findOne({_id:adminID.id})
        res.json({username: admin.username})
    }   
    catch(err){
        res.json({err})    
    }
})  

admin.get('/addBlog', async(req, res)=>{
    let authors = await Admin.find({}, 'name username')
    res.render('addBlog', {authors})
})

admin.post('/addBlog', async(req, res)=>{
    let {authToken, title, author, visibility, coverImg, blogBody} = req.body
    let adminID = jwt.verify(authToken, process.env.JWT_PRIVATE_KEY)
    let admin = await Admin.findOne({_id:adminID.id})
    if(!admin){
        res.json({err: 'Admin Not Found'})
    }
    else{
        const date = new Date()
        const slug = `${title.replace(/\s/g, "-").toLowerCase()}-${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}` 
        try {
            let blog = new Blog({title, slug, author, visibility, coverImg, blogBody})
            blog.save()
            res.json({msg: "saved"})
        } catch (err) {
            res.json({err})
        }
    }
})

admin.delete('/deleteBlog', async(req, res)=>{
    try{
        let adminID = jwt.verify(req.body.authToken, process.env.JWT_PRIVATE_KEY)
        let admin = await Admin.findOne({_id:adminID.id})
        if(admin){
            await Blog.findByIdAndDelete(req.body.blogId)
            res.json({msg: "Blog Deleted!"})
        }
        else{
            res.json({err: "Can't delete blog"})
        }
    }
    catch(err){
        res.json({err})
    }
})

export default admin