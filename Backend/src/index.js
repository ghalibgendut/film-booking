const express = require('express')
const app = express()
const port = 2021
const cors = require('cors')

//Routes
const userRoutes = require('../src/module/user/userRoutes')
const adminRoutes = require('../src/module/admin/adminRoutes')
const filmRoutes = require('../src/module/film/filmRoutes')



app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(adminRoutes)
app.use(filmRoutes)



app.get('/', (req,res)=> {
    res.status(200).json(`<h1>API Running at port : ${port}</h1>`)
})

app.listen(port, ()=> {console.log(`API Running at ${port}`)})