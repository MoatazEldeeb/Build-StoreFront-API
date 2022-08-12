CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    completed boolean,
    FOREIGN KEY(user_id) 
	  REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);