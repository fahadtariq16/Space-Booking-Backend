const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/user");
require("dotenv").config();
const ErrorResponse = require("../utils/errorResponse");
const router = express.Router();


router.post("/login",async(req,res,next)=>{
        try{
        const user = await User.findOne({email: req.body.email}); 
        if (!user){
            next(new ErrorResponse("Invalid Email",401));
        } 
        if(user){
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if (validPassword===false){
            next(new ErrorResponse("Invalid Password",401));
        }else{
        sendToken(user,200,res);
        }
       }
        }catch(error){
            res.status(500).json({
                success : "false",
                error : error.message
            })
        }
})

router.post("/register",async(req,res,next)=>{
    try{
    const user = new User ({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        role : req.body.role,
        visibility : true,
        deleted : false,
        resourceInfo : null
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    const result = await user.save();
    res.send(result);
    }catch(error){
        next(error);
    }
});


const sendToken = (user,statusCode, res) =>{
    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE});
    res.status(statusCode).json({success : true, token, user});
}


module.exports = router;