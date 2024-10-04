const express = require('express')
const User=require('../Models/ModelUser')
const {body,validationResult} =require('express-validator')
const Router=express.Router();
const bcrypt=require('bcryptjs')

const validateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('loct').notEmpty().withMessage('Location is required'),
    body('email').isEmail().notEmpty().withMessage('Valid email is required'),
    body('pass').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
  ];

Router.post('/createuser',validateUser,async (req,res)=>{
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),success:false });
    }
    const {name,loct,email,pass}=req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({success:false ,error: 'User with this email already exists' });
    }

    const salt=await bcrypt.genSalt(10);
    let secPass =await bcrypt.hash(pass,salt)

    try{
        await User.create({name,loct,email,pass:secPass})
        res.json({success:true})
    }
    catch(err){res.json({success:false,errors:err})}
})
module.exports = Router