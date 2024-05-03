const jwt = require('jsonwebtoken')
const config = require('../config')

const verifyToken = (req , res , next)=>{
    const token = req.headers["authorization"]
    if(!token){
        return res.status(403).send("A token is required for authentication");
    }
//Synchronously verify given token using a secret or a public key to get a decoded token
    try{
        const decoded = jwt.verify(token , config.AUTH_Secret)   
        //passing the decoded user data into claims key
        req.claims = decoded;
    }catch(err){
        return  res.status(401).send("Invalid token")
    }
    return next();
}

module.exports = verifyToken;