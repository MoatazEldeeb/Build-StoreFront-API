// @ts-ignore
import Client from '../database'


export type Order = {
    id: number;
    user_id: number;
    completed: boolean;
}
export type Order_Product = {
  order_id: number;
  product_id: number;
  quantity: number;
}

export class OrderStore {
    async index(): Promise<Order[]> {
      try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM Orders'
  
        const result = await conn.query(sql)
  
        conn.release()
  
        return result.rows 
      } catch (err) {
        throw new Error(`Could not get Orders. Error: ${err}`)
      }
    }

    async create(o: Order): Promise<Order> {
      try {
        const sql =
          "INSERT INTO orders ( user_id,completed) VALUES($1, $2) RETURNING *";
        const conn = await Client.connect();
        const result = await conn.query(sql, [ o.user_id,o.completed]);
        const order = result.rows[0];
  
        conn.release();
  
        return order;
      } catch (err) {
        throw new Error(`Unable to create order. Error: ${err}`);
      }
    }

    async getCurrentOrderByUser(userId :number): Promise<Order[]> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'SELECT * FROM Orders WHERE user_id=$1'
    
          const result = await conn.query(sql,[userId])
    
          conn.release()
    
          return result.rows[0]
        } catch (err) {
          throw new Error(`Could not get Orders for User ${userId}. Error: ${err}`)
        }
      }
    async createOrderProduct(o: Order_Product): Promise<Order> {
      try {
        const conn = await Client.connect();

        const sql ="INSERT INTO order_product (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
        
        const result = await conn.query(sql, [
          o.order_id,
          o.product_id,
          o.quantity
        ]);
  
        conn.release();
  
        return result.rows[0];
      } catch (err) {
        throw new Error(
          `Unable to add product ${o.product_id} to order ${o.order_id}: ${err}`
        );
      }
    }
  }
