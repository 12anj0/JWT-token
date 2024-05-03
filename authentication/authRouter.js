const express =require('express');
const router = express.Router();

const authController = require('./authController');

router.post('/register' , (req ,res) =>{
    try{
        const {name , email , password} = req.body;
        if(!(name,email,password)){
            return res.status(400).send("Required input is missing");
        }

        const userDetail = {
            name , email , password
        }

        authController.registerUser(userDetail , (err , result) =>{
            if(err){
                return res.status(400).send({error : "user already exists"});
            }else{
                res.status(200).send(result);
            }
        })

    }catch(err){
        res.status(500).send({error : "unexpected eoor while registering the user"})
    }
})

router.post('/login' , (req , res) =>{
    try {
        const {email , password} = req.body
        if(!(email && password)){
            return res.status(400).send("the required inputs are missing!!")
        }
        authController.loginUser({email , password} ,(err , result)=>{
            if(err){
                res.status(401).send({error : "Invalid credentials" , err})
            }else{
                res.status(200).send(result)
            }
        })

    } catch (err) {
        res.status(500).send({error : "unexpected eoor while registering the user" ,err})
    }
})

module.exports = router