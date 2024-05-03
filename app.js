const express = require('express');
const app = express()
const config = require('./config')
const authRouter = require('./authentication');
const userRouter = require('./users')
const verifyAuth = require('./authentication/authMiddleware')

const dateFormat = require('date-format')
const morgan =require('morgan')
//morgan is a loggin tool 

app.use(express.json())
morgan.token('time' ,() =>dateFormat.asString(dateFormat.ISO8601_FORMAT , new Date()))

app.use('/auth' ,authRouter)
app.use('/users' , verifyAuth , userRouter)

app.listen(config.PORT ,() =>{
    console.log("listening on port 3000");
})