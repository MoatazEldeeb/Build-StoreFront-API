import express, { Request, Response } from 'express'
import { Order, Order_Product, OrderStore } from '../models/order'
import verifyToken from "../middleware/verifyToken";

const store = new OrderStore()

const CurrentOrderByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.getCurrentOrderByUser(parseInt(req.params.userId))
    res.json(orders)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
  
}

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.json(orders)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
  
}
const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: -1,
      user_id: (req.body.userId as unknown) as number,
      completed: req.body.completed as boolean,
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createOrderProduct = async (req: Request, res: Response) => {
  

  try {
    const orderProduct: Order_Product = {
      order_id: (req.body.orderId as unknown) as number,
      product_id: (req.body.productId as unknown) as number,
      quantity: (req.body.quantity as unknown) as number
    };
    const addedProduct = await store.createOrderProduct(orderProduct)
    res.json(addedProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
};


const orderRoutes = (app: express.Application) => {
  app.get('/orders/users/:userId', verifyToken,CurrentOrderByUser)
  app.get("/orders", index)
  app.post("/orders", verifyToken, create)
  app.post("/orders/products", verifyToken, createOrderProduct)
}

export default orderRoutes