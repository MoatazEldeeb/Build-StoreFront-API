# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion
# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

Database host number: 127.0.0.1

## Steps to Run
Run these commands
1- npm install
2- npm start

3- Creating databases and users
    psql postgres
    CREATE USER full_stack_user WITH PASSWORD 'password123';
    CREATE DATABASE full_stack_dev;
    CREATE DATABASE full_stack_test;
    GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
    GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO full_stack_user;

4- Run migrations
db-migrate up

## Endpoints
### Orders
To GET order by user id:  GET '/orders/users/:userId' [token required]
To GET all orders:  GET "/orders"
To POST order:  POST "/orders" [token required]
    Specifying in the req body(via JSON):
        userId, completed(boolean)
To POST order product: POST "/orders/products" [token required]
    Specifying in the req body(via JSON):
        orderId, productId, quantity

### Users
To GET all users:  GET '/users' [token required]
To get user toket (JWT):  POST '/users/authenticate' 
    Specifying in the req body(via JSON):
        name, password
To GET user by id:  GET '/users/:id' [token required]
To POST a user:  POST '/users'
    Specifying in the req body(via JSON):
        name, password

### Products
To GET all products:  GET '/products' 
To GET product by id:  GET '/products/:id'
To POST a product:  POST '/products' [token required]
    Specifying in the req body(via JSON):
        name, price

## Enviroment variables(is in .env file):
ENV = dev
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=full_stack_dev
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=password123
POSTGRES_TEST_DB=full_stack_test
BCRYPT_PASSWORD = open-sesame
TOKEN_SECRET = Sog@*Fos2*7
SALT_ROUNDS = 10
JWT_TESTING_TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJuYW1lIjoibW9hdGF6IiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJGpPZ1Evc1E5RldxOXRWQzBPdGtDMGVROFBaSUEvMXdiTDdpaVEwYVp0cUdCbzBrVC8yV1pXIn0sImlhdCI6MTY2MDIzNzY1N30.Yog-V9sx2_P_LjMG-GyY4a6E7cN5RynJkUHVKD20wPw


## Script to run tests
npm run test

