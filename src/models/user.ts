// @ts-ignore
import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export type User = {
    id: number;
    name: string;
    password_digest: string;
}
const pepper:string = process.env.BCRYPT_PASSWORD as unknown as string
const saltRounds:string = process.env.SALT_ROUNDS as unknown as string

export class UserStore {
    async index(): Promise<User[]> {
      try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM users'
  
        const result = await conn.query(sql)
  
        conn.release()
  
        return result.rows 
      } catch (err) {
        throw new Error(`Could not get Users. Error: ${err}`)
      }
    }
  
    async show(id: number): Promise<User> {
      try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
      conn.release()
  
      return result.rows[0]
      } catch (err) {
          throw new Error(`Could not find User ${id}. Error: ${err}`)
      }
    }
  
    async create(u: User): Promise<User> {
        try {
          //for testing purpose
          let sql:string
          if(u.id ==77){
            sql = 'INSERT INTO users (id,name, password_digest) VALUES(77,$1, $2) RETURNING *'
          }
          else{
            sql = 'INSERT INTO users (name, password_digest) VALUES($1, $2) RETURNING *'
          }
      // @ts-ignore
      const conn = await Client.connect()
  
      const pepperedPassword = `${u.password_digest}${pepper}`;
      const salt = await bcrypt.genSalt(parseInt(saltRounds as string));
      const hashPassword = bcrypt.hashSync(pepperedPassword, salt);
      // const hash = bcrypt.hashSync(
      //   u.password_digest + pepper, 
      //   parseInt(saltRounds)
      // );

      const result = await conn.query(sql, [u.name, hashPassword])
  
      const user = result.rows[0]
  
      conn.release()

      console.log(`User created ${user.name}`)
  
      return user
        } catch (err) {
            throw new Error(`Could not add new User ${u.name}. Error: ${err}`)
        }
    }
  

    async authenticate(username: string, password: string): Promise<User | null> {
      console.log("Authenticating from user")
      const conn = await Client.connect()
      console.log(2)
      const sql = 'SELECT * FROM users WHERE name=($1)'

      const result = await conn.query(sql,[username])
      console.log(3)
  
      console.log(password+pepper)
      conn.release()
  
      if(result.rows.length) {
  
        const user = result.rows[0]
  
        console.log(user)
  
        if (bcrypt.compareSync(password+pepper, user.password_digest)) {
          return user
        }
      }
  
      return null
    }
  }
