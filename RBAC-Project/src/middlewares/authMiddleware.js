const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) => {
    let token
    const authHeaders = req.headers.authorization
    if(authHeaders && authHeaders.startsWith("Bearer")){
        token = authHeaders.split(" ")[1]
        if(!token){
            return res.status(401).json({message:"No token. Authorization denied"})
        } 
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode
            next()
        }catch(err){
            res.status(400).json({message: "Token is not valid"})
        }
    }else{
        return res.status(401).json({message:"No token. Authorization denied"})
    }
}

module.exports = verifyToken