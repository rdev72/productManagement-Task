const express = require('express')
const morgan = require('morgan')
const {port} = require('./config')
const isLoggedIn = require('./helpers/isLoggedIn')
const app = express()

// Middlewares
//bodyParser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//mongoose
require('./helpers/db')
//morgan
app.use(morgan('dev'))

//Routes
app.get('/',(req,res)=>res.send('this is Product Management website'))

app.use('/user',require('./routes/user'))
app.use('/product',isLoggedIn ,require('./routes/product'))

app.listen(port,()=>console.log(`server is running at ${port}`))
