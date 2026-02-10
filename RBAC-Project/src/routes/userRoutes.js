const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/authMiddleware')
const authoizeRole = require('../middlewares/roleMiddleware')

//Only admin can access this router
router.get("/admin", verifyToken, authoizeRole("admin"), (req,res) => {
    res.json({message: "Welcome Admin"})
})

//Both admin and manger can access this router
router.get("/manager", verifyToken,authoizeRole("admin","manager"), (req,res) => {
    res.json({message: "Welcome Manager"})
})

//All can access this router
router.get("/user", verifyToken, authoizeRole("admin","manager","user"),(req,res) => {
    res.json({message: "Welcome User"})
})

module.exports = router