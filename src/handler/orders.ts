import express, { Request , Response } from "express";
import { Order, OrderClass } from "../model/order";

const ordersRouter = express.Router();
const store = new OrderClass();











export default ordersRouter;