CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    password_digest VARCHAR
);