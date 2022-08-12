
import dotenv from "dotenv"
import { OrderStore } from "../order"
import { User, UserStore } from "../user"
import { Product,ProductStore } from "../product"

dotenv.config()

const store = new OrderStore()
const userStore = new UserStore()
const productStore = new ProductStore()

const p:Product = {
  id:77,
  name: "Iphone",
  price: 1000,
}

describe("Order Model", () => {

  // beforeAll(async () => {

  //   const user: User = {
  //     id:77,
  //     name:"Hesham",
  //     password_digest: "password123"
  //   }
  //   await userStore.create(user)

  //   await productStore.create(p)
  // })

  it("should have an INDEX method", () => {
    expect(store.index).toBeDefined();
  })

  it("should have a Get current order by user id method", () => {
    expect(store.getCurrentOrderByUser).toBeDefined();
  })

  it("should have a CREATE method", () => {
    expect(store.createOrderProduct).toBeDefined();
  })

  it("CREATE method should add an order", async () => {
    // @ts-ignore
    const { user_id,completed } = await store.create({
      user_id: 77,
      completed:true
    })

    expect({ user_id,completed }).toEqual({
      user_id: 77,
      completed: true,
    })
  })

  it("INDEX method should return a list of all orders", async () => {
    // @ts-ignore
    const [{ user_id,completed }] = await store.index()

    expect({ user_id,completed }).toEqual({
      user_id: 77,
      completed: false,
    })
  })

  it("getCurrentOrderByUser method should return the orders of a user", async () => {
    // @ts-ignore
    const { user_id,completed } = await store.getCurrentOrderByUser(77);

    expect({ user_id,completed }).toEqual({
      user_id: 77,
      completed: false
    });
  });

  it("createOrderProduct method should add an order with product quantity and product id", async () => {
    // @ts-ignore
    const { quantity, order_id, product_id } = await store.createOrderProduct({
      order_id: 2,
      product_id: 77,
      quantity: 4
    });

    expect({ quantity, order_id, product_id }).toEqual({
      order_id: 2,
      product_id: 77,
      quantity: 4
    });
  });


})