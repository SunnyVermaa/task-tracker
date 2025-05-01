const express = require('express')
const userRoutes = require('./routes/userRouter')
const projectRoutes = require('./routes/projectRoutes')
const taskRoutes = require('./routes/taskRoutes')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const connectToDb = require('./database/db')
connectToDb()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('hello sunny')
})

app.use('/users', userRoutes)
app.use('/project',projectRoutes)
app.use('/task',taskRoutes)




module.exports = app;