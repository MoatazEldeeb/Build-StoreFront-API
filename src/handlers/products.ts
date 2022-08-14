import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import verifyToken from "../middleware/verifyToken";

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
  
}

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id as unknown as number) //It was body
    res.json(product)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
   
}

const create = async (req: Request, res: Response) => {
 
  try {
      const product: Product = {
          id: -1,
          name: req.body.name,
          price: req.body.price
      }

      const newProduct = await store.create(product)
      res.json(newProduct)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyToken, create)
}

export default productRoutes