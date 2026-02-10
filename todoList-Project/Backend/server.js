const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const todoRoutes = require('./routes/todo.js')
const cors = require("cors");
const connectDb = require("./config/db")
connectDb()

app.use(cors())
app.use(express.json())
app.use("/api/todos", todoRoutes)

app.listen(5000, () => {
    console.log(`Server listens to port 5000`)
})