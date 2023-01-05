import { Request , Response } from 'express';
// Create an Error interface to add more options 
interface Error{
    name?: string;
    stack?: string;
    message?: string;
    status?: number
};

// create a handler as midddleware to deal with most errors

const ErrorHandler = (error:Error, req:Request, res:Response):void=>{
    // 500 code status => the server encountered unexpected condition that prevented it from fulfilling a request
    const status = error.status || 500;
    const message = error.message || "Internal server unexpected error";
    res.status(status).json({status, message})
}


export default ErrorHandler;