import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User, UserStore } from "../user";
import { parseJwt } from "../../utils/JwtParsing";

dotenv.config();
const { SALT_ROUNDS, BCRYPT_PASSWORD, TOKEN_SECRET } = process.env;

const store = new UserStore();


describe("User Model", () => {
  it("should have an INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a CREATE method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a LOGIN method", () => {
    expect(store.authenticate).toBeDefined();
  });


  it("CREATE method should add a user", async () => {

    const user: User = {
      id: -1,
      name:'Moataz',
      password_digest:'12345'
    };

    const { name } = await store.create(user);

    expect({ name }).toEqual({
      name: 'Moataz',
    });
  });

  it("INDEX method should return a list of users", async () => {
    const userList = await store.index();
    const { name } = userList[2];

    expect([{ name}]).toEqual([{name:'Moataz'}]);
  });

  it("SHOW method should return a user by id", async () => {
    const { name } = await store.show(2);

    expect(name).toEqual('Moataz');
  });

  it("authenticate method should return a token", async () => {
    const foundUser = await store.authenticate('Moataz','12345') as unknown as User;
    expect(foundUser).toBeDefined();

    const pepperedPassword = `${'12345'}${BCRYPT_PASSWORD}`;
    const validPassword = bcrypt.compareSync(
      pepperedPassword,
      foundUser.password_digest
    );
    expect(validPassword).toBeTrue();

    const token = jwt.sign(
      { username: foundUser.name },
      TOKEN_SECRET as string
    );
    const { username } = parseJwt(token);
    expect(username).toBe(foundUser.name);
  });

});