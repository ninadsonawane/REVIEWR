import mongoose from "mongoose";
import express from "express";
import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
 
const router = express.Router();

export const signin = async (req , res) => {
     const { email  , password } = req.body;
     try {
        const existingUser = await User.findOne({ email });
        if(!existingUser) return res.status(404).json({ message:'User not found! Please Signup'});
        const isPassCorrect = await bcrypt.compare(password , existingUser.password);
        if(!isPassCorrect) return res.status(400).json({ message:'Invalid Credentails'});
        const token = jwt.sign({ email:existingUser.email , id:existingUser._id } , 'test' , { expiresIn:'1h' });  //We will send this token to frontend
        res.status(200).json({ result:existingUser , token })
     } catch (error) {
         res.status(500).json({ message:'Something Wrong! Contact Developer'});
         console.log(error);

     }
}

export const signup = async (req, res) => {
    const { firstName , lastName , email , password , confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message:'User Already exists!'});
        if(password !== confirmPassword ) return res.status(400).json({ message:'Password should match!'});
        const hashedPassword = await bcrypt.hash(password , 12);
        const result = await User.create({ email , password: hashedPassword , name: `${firstName} ${lastName}`});
        const token = jwt.sign({ email:result.email , id:result._id } , 'test' , { expiresIn:'1h' });  //We will send this token to frontend
        res.status(200).json({ result , token })
    } catch (error) {
        res.status(500).json({ message:'Something Wrong! Contact Developer'});
        console.log(error);
   }
}
