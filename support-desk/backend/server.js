const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 8000
const app = express() 

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/',(req,res) => [
    res.status(200).json({message: "Welcome"})
])

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets',require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`${PORT} go go `))


