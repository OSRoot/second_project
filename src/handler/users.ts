import express, {  Request, Response } from "express";
import { User, UserClass } from "../model/user";
import jwt from 'jsonwebtoken';

const route = express.Router()
const store = new UserClass();

route.use(express.json());


const createUser = async (req: Request, res:Response):Promise<void>=>{
    const user: User = {
        username:req.body.username,
        password:req.body.password,
    }
    try{
        const newUser = await store.create(user);
        var token = jwt.sign({ user:newUser }, (process.env.TOKEN_SECRET) as string)
        res.json(token);
    }catch(error){
        res.status(400);
        res.json( error + user )
    }
}


const authenticateUser = async (req:Request, res: Response):Promise<void>=>{
    const user: User = {
        username: req.body.username,
        password:req.body.password,
    }
    try {
        const u = await store.authenticate(user.username, user.password);
        var token = jwt.sign({user:u}, (process.env.TOKEN_SECRET) as string);
        res.json(token);

    }catch(error){
        res.status(401);
        res.json({error})
    }
} 
