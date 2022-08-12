import supertest from 'supertest'
import dotenv from "dotenv"
import app from "../../server"

dotenv.config()
const { JWT_TESTING_TOKEN } = process.env
const token = JWT_TESTING_TOKEN as string

const request = supertest(app)

const userInstance = {
    id:-1,
  name:'Joshua',
  password_digest: "josh123",
}

describe("User Handler", () => {
  it("should return success for CREATE user", async () => {
    const response = await request.post("/users").send(userInstance)

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
  })

  it("should return success for READ all users", async () => {
    const response = await request
      .get("/users")
      .auth(token, { type: "bearer" })

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
  })

  it("should return success for READ user by username", async () => {
    const response = await request
      .get("/users")
      .auth(token, { type: "bearer" })
      .send(`username=${userInstance.name}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
  })

  it("should return success for AUTHENTICATE user", async () => {
    const response = await request.post("/users/authenticate").send({
      username: userInstance.name,
      password: userInstance.password_digest,
    })

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
  })


})