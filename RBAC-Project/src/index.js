const express = require('express')
const dotenv = require('dotenv').config()
const dbConnect = require('./config/dbConnect.JS')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

dbConnect()

const app = express()

//Middlewares
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

//Routes

//Start the Server
const PORT = process.env.PORT || 7002
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})