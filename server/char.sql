CREATE TABLE characteristics (
  id int,
  product_id int,
  name varchar(255),
  PRIMARY KEY (id)
);

COPY characteristics FROM '/home/ubuntu/reviews/database/characteristics.csv' DELIMITER ',' CSV HEADER;