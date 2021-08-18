CREATE TABLE characteristic_reviews (
  id serial,
  characteristic_id int,
  review_id int,
  value int,
  PRIMARY KEY (id)
);

COPY characteristic_reviews FROM '/home/ubuntu/reviews/database/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;