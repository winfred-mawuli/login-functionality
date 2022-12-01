import ApiError from '../utils/ApiError';
const jwt = require('jsonwebtoken');
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { Request,Response,NextFunction } from 'express';

const protect = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        try {
            //get token from header
            token = req.headers.authorization.split('Bearer ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token
            if(decoded){
                const user = await User.findOne({_id:decoded.id})
                if(user){
                    next()
                }
                else{
                    res.sendStatus(401).json({
                        message: 'Unauthorized'
                    })
                }
            }  
        } catch (error) {
                 res.sendStatus(401).json({
                message: 'Not authorized'
            })
        }
    }
    if(!token){
        next((ApiError.Unauthorized('Unauthorized access,')))
    }
})

export default protect;