import Express from "express";

const port = 3000
const app = Express()

app.get('/', (req, res)=>{
    res.send('Hello World')
})

app.listen(port, ()=>{
    console.log(`App is listening at localhost:${port}`)
})