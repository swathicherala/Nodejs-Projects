const mongoose = require('mongoose')
const { use } = require('../routes/contactRoutes')

const userSchema = mongoose.Schema({
    username : {
        type: String,
        requires: [true, "Please add the user name"]
    },
    email: {
        type: String,
        required: [true, "Please add the user email addess"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)

