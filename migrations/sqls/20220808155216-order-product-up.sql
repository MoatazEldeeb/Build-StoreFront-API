CREATE TABLE order_product(
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY(order_id) 
	  REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(product_id) 
	  REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(order_id,product_id)
);