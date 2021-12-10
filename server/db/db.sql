CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT REFERENCES restaurants(id) NOT NULL,
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL check (rating >= 1 and rating <= 5) NOT NULL
);

CREATE TABLE accounts (
  a_id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  balance DECIMAL(10,2) NOT NULL
);

CREATE TABLE transac_history (
  t_id BIGSERIAL NOT NULL PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  amount DECIMAL(10,2) NOT NULL,
  a_id BIGINT REFERENCES accounts(a_id) NOT NULL
);