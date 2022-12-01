
import ApiError from '../utils/ApiError';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
import asyncHandler from 'express-async-handler';

import User from '../models/userModel';
import { Request,Response,NextFunction } from 'express';



const generateToken = (id:any)=>{
   return jwt.sign({id}, `${process.env.JWT_SECRET}`,{
        expiresIn: `${process.env.JWT_EXPIRATION}`
    })
}


//@desc Registers a new user
//@route Post / api/users/signup
//@access Public
export const signup = asyncHandler(async(req:Request,res:Response,next:NextFunction)=> {
    const {username,email, password} = req.body;
    if(!username || !email || !password){
        next((ApiError.BadRequest('Username, email and password are required')))
        return;
    }

    //checks if user exists
    let userExists = await User.findOne({email: email});
    if(userExists){
        next((ApiError.BadRequest('Email already exists')))
        return;
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

//Create new user
    const user = await  User.create({
        username,
        email,
        password:hashedPassword
    });

    if(user){
        res.status(201).json({
            status: 200,
            message:'signup success',
            data:{
                username,
                email,
                _id:user._id,
                token: generateToken(user._id)
            }
        }) 
    }else{
        next((ApiError.BadRequest('Invalid user Data')));
        return;
    }   
})  

//@desc Authenticate a user
//@route Post / api/users/login
//@access Public

export const login = asyncHandler(async(req:Request,res:Response,next:NextFunction)=> {
    const {email,password} = req.body;
    
    //checks if user email
    const user = await User.findOne({email})
    if(user &&(await bcrypt.compare(password, user.password))){
        res.status(200).json({
                    status: 200,
                    message:'login success',
                    data:{
                        username:user.username,
                        email,
                        _id:user._id,
                        token: generateToken(user._id)
                    }
                })
    }else{
        next((ApiError.BadRequest('Invalid email or password')))
        return;
    }
})

//@desc Get user data
//@route GET /users/me
//@access Private

export const profile = asyncHandler(async (req:Request, res:Response,next:NextFunction) =>{
    const id = req.params.id
    const user = await User.findById(id).select('-password')
    if(user){
        res.status(200).json({
            status: 200,
            message:'profile',
            data:{
                userID: user?._id,
                username: user?.username,
                email: user?.email,
            }
        })
    }else{
        next((ApiError.BadRequest('User not found')))
        return;
    }
    
})

