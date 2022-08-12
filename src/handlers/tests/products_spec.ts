import supertest from "supertest"
import dotenv from "dotenv"
import app from "../../server"

dotenv.config()
const { JWT_TESTING_TOKEN } = process.env
const token = JWT_TESTING_TOKEN as string

const request = supertest(app)

const productInstance = {
    id:-1,
  name: "Laptop",
  price: 1800,
}

describe("Product Handler", () => {
  it("should return success for CREATE product", async () => {
    const response = await request
      .post("/products")
      .auth(token, { type: "bearer" })
      .send(productInstance)

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
  });

  it("should return success for READ all products", async () => {
    const response = await request.get("/products")

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
  })

  it("should return success for READ product by product ID", async () => {
    const response = await request
      .get("/products/1")

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
  })

})