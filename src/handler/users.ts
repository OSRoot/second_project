import express, {  Request, Response } from "express";
import { User, UserClass } from "../model/user";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const usersRouter = express.Router()
const store = new UserClass();
usersRouter.use(express.json());

// This should go to the user profile
usersRouter.get('/user', async (req:Request, res: Response):Promise<void>=>{
    try {
        const users = await store.index();
        res.json(users)
    } catch (error) {
        console.log(error);
        
        res.status(302);
        res.json( {error })
    }
})



// This Should Create a new user with access token?
usersRouter.post('/createuser', async(req:Request, res:Response)=>{
    try{
        const user: User ={
            username:req.body.username,
            password:req.body.password,
        }

        const existUser = await store.oneUser(user.username);
        if(existUser?.id) throw {message:"Username already exist"}


        const newUser = await store.create(user);
        var token = jwt.sign({ user:newUser }, (process.env.TOKEN_SECRET) as string)
        res.json(token);
    }   catch(error){
        // 400 code status : Bad Request
        // 302 code status : found
        res.status(302);
        res.json(error)
    }
})

// This Should authenticate user with access token?
usersRouter.post('/sign', async(req:Request, res: Response):Promise<void>=>{
    
    const user: User = {
        username: req.body.username,
        password:req.body.password,
    }

    try {
        const u = await store.authenticate(user.username, user.password);
        var token = jwt.sign({user:u}, (process.env.TOKEN_SECRET) as string);
        res.json(token);

    }catch(error){
        console.log(error);
        
        // 401 code status : Unauthorized
        res.status(401);
        res.json({message:"Access denied"})
    }
})

export default usersRouter;