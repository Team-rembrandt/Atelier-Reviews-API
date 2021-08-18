create index on reviews (product_id);
create index on reviews (id);
create index on reviews_photos (review_id);
create index on characteristics (product_id);
create index on characteristic_reviews (characteristic_id);
create index on characteristic_reviews (review_id);
create index on characteristic_reviews (value);
