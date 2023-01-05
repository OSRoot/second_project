import express, { Request, Response, Application } from 'express';

const app: Application =express();
const port:number= 7000;

// add json parser to parse the req.body
// app.use(express.json())



app.post('/create', (req:Request, res:Response):void=>{
    const {
        email,
        username,
        fname,
        lname,
        password
    } = req.query;
    console.log(req.query);
    
    res.status(200).json({
        email:email,
        user:username,
        firstname:fname,
        lastname:lname,
        password:password
    })
})




app.get('/', (req:Request, res:Response):void=>{
    res.status(200).json({
        message:"Hello world"
    });
});




app.listen(port, ():void=>{
    console.log(`Server started at : http://127.0.0.1:${port}`);
})