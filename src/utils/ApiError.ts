//create an error class for the error
class ApiError extends Error {
    statusCode: number;
    constructor(statusCode:number,message: string) {
        super(message)
        this.statusCode = statusCode

    }

    // constructor(statusCode:number, msg: string) {
    //     super(statusCode,msg)
    //     this.statusCode= statusCode;
    //     this.msg= msg;
    // }


    static BadRequest( msg: string){
        return new ApiError(400,msg);
    }

    static Unauthorized(msg: string){
        return new ApiError(401,msg);
    }
    static Forbidden(msg: string){
        return new ApiError(403,msg);
    }
    static NotFound(msg: string){
        return new ApiError(404,msg);
    }
    static MethodNotAllowed(msg: string){
        return new ApiError(405,msg);
    }
    
}

export default ApiError;