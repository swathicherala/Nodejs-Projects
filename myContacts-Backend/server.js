const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorhandler')
const app = express()
const port = process.env.PORT || 5000
const connectDb = require('./config/dbConnection')
connectDb()

//Whenever we use middleware we write app.use()
app.use(express.json()) //middleware (to accept data from client to server) this provides a parser which will help us to parse the datastream that we recieve from the client on the server side  
app.use('/api/contacts', require('./routes/contactRoutes')) //middleware to access routes 
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on the port ${port}`)
})