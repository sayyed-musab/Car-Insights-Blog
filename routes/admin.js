import express from "express"
const admin = express.Router()

admin.use(express.static('public'))

admin.get('/login', (req, res)=>{
    res.render('login')
})

admin.get('/dashboard', (req, res)=>{
    res.render('dashboard')
})

admin.get('/addBlog', (req, res)=>{
    res.render('addBlog')
})

export default admin