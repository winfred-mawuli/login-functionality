import ApiError from "./ApiError";
import {Request,Response,NextFunction} from 'express';


 async function apiErrorHander(err:ApiError,req:Request,res: Response,next:NextFunction) {
    // console.error(err);
    

    if(err instanceof ApiError){
        console.log(err.statusCode);
        return res.status(err.statusCode).json({"message" : err.message})
        
    }
    return res.status(500).json('Something went wrong')
}

export default apiErrorHander;