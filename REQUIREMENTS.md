# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- name
- password

#### Orders
- id
- user_id (foriegn)
- completed

#### Order Product
- product_id
- order_id 
- quantity

## Database schema
                                    Table "public.products"
 Column |          Type          | Collation | Nullable |               Default
--------+------------------------+-----------+----------+--------------------------------------
 id     | integer                |           | not null | nextval('products_id_seq'::regclass)
 name   | character varying(100) |           |          |
 price  | integer                |           |          |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_product" CONSTRAINT "order_product_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)


                              Table "public.orders"
  Column   |  Type   | Collation | Nullable |              Default
-----------+---------+-----------+----------+------------------------------------
 id        | integer |           | not null | nextval('orders_id_seq'::regclass)
 user_id   | integer |           |          |
 completed | boolean |           |          |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:  
    TABLE "order_product" CONSTRAINT "order_product_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)  

                                        Table "public.users"  
     Column      |          Type          | Collation | Nullable |              Default  
-----------------+------------------------+-----------+----------+-----------------------------------  
 id              | integer                |           | not null | nextval('users_id_seq'::regclass)   
 name            | character varying(100) |           |          |  
 password_digest | character varying      |           |          |  
Indexes:  
    "users_pkey" PRIMARY KEY, btree (id)  
Referenced by:  
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)  

             Table "public.order_product"
   Column   |  Type   | Collation | Nullable | Default
------------+---------+-----------+----------+---------
 order_id   | integer |           | not null |
 product_id | integer |           | not null |
 quantity   | integer |           |          |
Indexes:
    "order_product_pkey" PRIMARY KEY, btree (order_id, product_id)
Foreign-key constraints:
    "order_product_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_product_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
