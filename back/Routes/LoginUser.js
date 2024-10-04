const express = require('express')
const User = require('../Models/ModelUser')
const { body, validationResult } = require('express-validator')
const Router = express.Router();
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken');
const jwtSecreat="mnap34v7102vzmn7Ccc030"

const validateUser = [
    body('email').isEmail().withMessage('Valid email is required'),
     ];

Router.post('/login',validateUser , async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),success:false });
    }
    const { email, pass } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        console.log('not found');
        return res.status(400).json({succes:false });
    }
    const passComp = await bcrypt.compare(pass,user.pass)

    
    if(!passComp) {
        console.log('password not match');
        return res.status(400).json({succes:false });
        
    }
    const data={user:{id:user.id}}
    const authToken=jwt.sign(data,jwtSecreat)
    console.log(user);
    return res.status(200).json({ succes:true,authtoken:authToken });
})
module.exports = Router