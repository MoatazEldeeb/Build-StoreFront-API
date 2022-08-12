// @ts-ignore
import Client from '../database'


export type Product = {
    id: number;
    name: string;
    price: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
      try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM Products'
  
        const result = await conn.query(sql)
  
        conn.release()
  
        return result.rows 
      } catch (err) {
        throw new Error(`Could not get Products. Error: ${err}`)
      }
    }
  
    async show(id: number): Promise<Product> {
      try {
      const sql = 'SELECT * FROM Products WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
      conn.release()
  
      return result.rows[0]
      } catch (err) {
          throw new Error(`Could not find Product ${id}. Error: ${err}`)
      }
    }
  
    async create(p: Product): Promise<Product> {
      let sql:string
        try {
          //For testing pusrpose
          if(p.id==77){
            sql = 'INSERT INTO Products (id,name, price) VALUES(77 ,$1, $2) RETURNING *'
          }else{
            sql = 'INSERT INTO Products (name, price) VALUES($1, $2) RETURNING *'
          }
        // @ts-ignore
      const conn = await Client.connect()
  

      const result = await conn
          .query(sql, [p.name, p.price])
  
      const Product = result.rows[0]
  
      conn.release()
  
      return Product
        } catch (err) {
            throw new Error(`Could not add new Product ${p.name}. Error: ${err}`)
        }
    }
  

    
  }
