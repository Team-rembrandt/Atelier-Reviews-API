CREATE TABLE reviews_photos (
  id int,
  review_id int,
  url text,
  PRIMARY KEY (id)
);

COPY reviews_photos FROM '/home/ubuntu/reviews/database/reviews_photos.csv' DELIMITER ',' CSV HEADER;