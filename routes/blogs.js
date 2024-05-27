import express from "express"
const blogs = express.Router()

blogs.use(express.static('public'))

blogs.get('/', (req, res)=>{
    res.render('blogs')
})

blogs.get('/:slug', (req, res)=>{
    res.render('blogpost')
})

export default blogs