import express, { Request, Response, Application } from 'express';
import usersRouter from './handler/users';
const app: Application =express();
const port:number= 7000;
require('dotenv').config();
// add json parser to parse the req.body
// app.use(express.json())

// Use the usersRouter handler/middleware
app.use('/', usersRouter)



app.get('/', (req:Request, res:Response):void=>{    
    // you could send json object to the client
    res.status(200).json({
    message:"Hello world"
    });
});




app.listen(port, ():void=>{
    console.log(`Server started at : http://127.0.0.1:${port}`);
})

// Note: all the functions used here should be separated in their own handler files