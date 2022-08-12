import { ProductStore } from "../product";

const store = new ProductStore();

describe("Product Model", () => {
  it("should have an INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a CREATE method", () => {
    expect(store.create).toBeDefined();
  });


  it("CREATE method should add a product", async () => {
    const { name, price } = await store.create({
        id:-1,
      name: "Iphone",
      price: 1000,
    });

    expect({ name, price }).toEqual({
      name: "Iphone",
      price: 1000,
    });
  });

  it("INDEX method should return a list of products", async () => {
    const [{ name, price }] = await store.index()
    expect([{ name, price }]).toEqual([
      {
        name: "Iphone",
        price: 1000
      }
    ]);
  });

  it("SHOW method should return a product by product name", async () => {
    const { name, price } = await store.show(2);

    expect({ name, price }).toEqual({
        name: "Iphone",
        price: 1000,
    });
  });

});