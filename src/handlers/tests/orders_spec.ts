import supertest from "supertest"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import app from "../../server"
import { User, UserStore } from "../../models/user"
import { Product,ProductStore } from "../../models/product"

dotenv.config();
const { SALT_ROUNDS, TOKEN_SECRET, JWT_TESTING_TOKEN } = process.env
const token = JWT_TESTING_TOKEN as string

const request = supertest(app)

const userStore = new UserStore()
const productStore = new ProductStore()


const p:Product = {
    id:77,
    name: "Iphone",
    price: 1000,
  }

describe("Order Handler", () => {
    beforeAll(async () => {

        const user: User = {
          id:77,
          name:"Hesham",
          password_digest: "password123"
        }
        await userStore.create(user)
    
        await productStore.create(p)
      })

  it("should return success for CREATE order", async () => {
    const response = await request
      .post("/orders")
      .auth(token, { type: "bearer" })
      .send({ userId: 77, completed: false})

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
  })

  it("should return success for READ all orders", async () => {
    const response = await request.get("/orders")

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
  })

  it("should return success for READ orders by user id", async () => {
    const response = await request.get("/orders/users/77").auth(token, { type: "bearer" })

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
  })

  it("should return success for CREATE order with product quantity and product id", async () => {
    const response = await request
      .post("/orders/products")
      .auth(token, { type: "bearer" })
      .send({ quantity: 2, orderId: 1, productId: 77 })

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
  })

  

})