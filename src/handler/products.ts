import express, { Request , Response } from "express";
import {Product, ProductClass} from '../model/product';
import jwt from 'jsonwebtoken';

const productsRouter = express.Router();
const store = new ProductClass();


productsRouter.get('/products', async(req: Request, res: Response):Promise<void>=>{
    try{
        const products = await store.index;
        res.status(200).json(products)

    }catch(error){
        throw new Error(`Couldn't Fetch products: ${error}`)
    }
});

productsRouter.post('/newproduct', async (req: Request, res: Response):Promise<void>=>{

    try{
        const auth_headaer = req.headers.authorization;
        const token = auth_headaer?.split(' ')[1];
        jwt.verify(token as string, (process.env.TOKEN_SECRET) as string)

    }catch(error){
        res.status(401);
        res.json('access denied, invalid token')
    }
    


    try{
        const product: Product = {
            name: req.body.name,
            price:req.body.price
        }
        const createProduct = await store.create(product)
    }catch(error){
        res.status(400);
        res.json(error)
    }
})








export default productsRouter;