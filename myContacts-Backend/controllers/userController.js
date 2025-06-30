const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//@desc Register all users
//@route POST /api/users
//@access public
const registeredUser = asyncHandler(async (req,res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory! ")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already registered")
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10) // to secure the raw password

    const user = await User.create({
        username, email, password:hashedPassword
    })

    if(user){
        res.status(201).json({_id:user.id,email:user.email })
    }else{
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.json({message : "Register the user"})
}) 

//@desc Login all users
//@route POST /api/users
//@access public
const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email:user.email,
                id:user.id
            }
        },
        process.env.Access_Token_Secret,
        {expiresIn: "15m"}
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
    res.json({message : "Login user"})
}) 

//@desc Current all users
//@route GET /api/users
//@access private
const currentUser = asyncHandler(async (req,res) => {
    res.json(req.user)
}) 

module.exports = { registeredUser, loginUser, currentUser}