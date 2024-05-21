import Express from "express"

const port = 3000
const app = Express()

app.set('view engine', 'ejs')
app.use(Express.static('public'))

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/blogs', (req, res)=>{
    res.render('blogs')
})

app.get('/blogpost', (req, res)=>{
    res.render('blogpost')
})

app.get('/about', (req, res)=>{
    res.render('about')
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.listen(port, ()=>{
    console.log(`App is listening at localhost:${port}`)
})