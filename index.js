import express from "express"
import blog from "./routes/blogs.js"
import admin from "./routes/admin.js"

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/blogs', blog)
app.use('/admin', admin)

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/about', (req, res)=>{
    res.render('about')
})

app.listen(port, ()=>{
    console.log(`App is listening at localhost:${port}`)
})