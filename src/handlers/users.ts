import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import verifyToken from "../middleware/verifyToken";

dotenv.config()
const store = new UserStore()


const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
  
}

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id as unknown as number)
   res.json(user)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
   
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: -1,
            name: req.body.name,
            password_digest: req.body.password,
        }

        const newUser = await store.create(user)
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        res.header("auth_token",token).send({token})
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
  console.log(`Authenticating user ${req.body.name}`)
  const user: User = {
    id: -1,
    name: req.body.name as string,
    password_digest: req.body.password as string
  }
  try {
      const u = await store.authenticate(user.name, user.password_digest)
      console.log(u)
      var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
      res.header("auth_token",token).send({token})
      
  } catch(error) {
      res.status(401)
      res.json({ error })
  }

}


const userRoutes = (app: express.Application) => {
  app.get('/users', verifyToken ,index)
  app.post('/users/authenticate',authenticate)
  app.get('/users/:id',verifyToken, show)
  app.post('/users', create)
}


export default userRoutes