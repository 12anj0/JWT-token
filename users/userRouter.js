const express =require('express')
const {route} =require('../authentication')
const router = express.Router();
const userController = require('./userController')

router.get('/' , (req , res )=>{
    try {
        const userData = req.claims
        console.log(claims)
        if(!userData.email){
            res.status(400).send("User data not available");
        }

        userController.findUser(userData.email ,(err , result)=>{
            if(err){
                res.status(400).send("Error getting the user" ,err);
            }else{
                res.status(200).send(result);
            }
        })
    } catch (err) {
        res.status(500).send({error:"unexpected error try after some time" , err});
    }
})

module.exports =router