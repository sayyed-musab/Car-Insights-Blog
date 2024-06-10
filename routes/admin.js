import express from "express"
import Admin from "../models/admin.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const admin = express.Router()

admin.use(express.static('public'))
admin.use(express.json())

admin.get('/', (req, res)=>{
    res.render('dashboard') 
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

admin.get('/addBlog', (req, res)=>{
    res.render('addBlog')
})

export default admin