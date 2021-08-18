const { Pool } = require('pg');
const pw = require('./config.js');

const pool = new Pool({
  host: '18.144.6.209',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: pw.pw
});

pool.connect();

var getReviews = (query, callback) => {
  var { product_id, page, count, sort } = query;
  var response = {
    product: product_id,
    page: page || 0,
    count: count || 5
  };
  response.results = pool.query(`SELECT reviews.id AS review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, to_timestamp(reviews.date/1000) as date, reviews.reviewer_name, reviews.helpfulness,
  json_agg(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url)) AS photos FROM reviews LEFT JOIN reviews_photos ON reviews_photos.review_id = reviews.id WHERE product_id=${product_id} AND reviews.reported=false GROUP BY reviews.id LIMIT 50`, (err, result) => {
    if (err) {
      console.log('review ', err);
    } else {
      callback(null, {
        product: response.product,
        page: response.page,
        count: response.count,
        results: result.rows
      });
    }
  });
}

var getMeta = (query, callback) => {
  var { product_id } = query;
  var response = {
    product_id: product_id,
    char: {}
  };
  // const queryRating = `SELECT json_build_object(
  //   '1', sum(case when reviews.rating = 1 then 1 else 0 end),
  //   '2', sum(case when reviews.rating = 2 then 1 else 0 end),
  //   '3', sum(case when reviews.rating = 3 then 1 else 0 end),
  //   '4', sum(case when reviews.rating = 4 then 1 else 0 end),
  //   '5', sum(case when reviews.rating = 5 then 1 else 0 end)) AS rating from reviews WHERE reviews.product_id=${product_id} GROUP BY reviews.product_id LIMIT 50;`;

  const qRating = `SELECT json_object_agg(rate, count) AS ratings FROM (SELECT rating AS rate, count(*) AS count FROM reviews WHERE product_id=${product_id} GROUP BY rating) AS rate;`;

  const queryRecommend = `SELECT json_build_object(
        'true', sum(case when reviews.recommend = true then 1 else 0 end),
        'false', sum(case when reviews.recommend = false then 1 else 0 end)) AS recommended
        FROM reviews WHERE reviews.product_id =${product_id} GROUP BY reviews.product_id LIMIT 50`;

  const queryMeta = `SELECT characteristic_reviews.characteristic_id AS id, AVG(characteristic_reviews.value) as value, characteristics.name
    FROM characteristic_reviews
    INNER JOIN characteristics
    ON characteristic_reviews.characteristic_id = characteristics.id
    WHERE product_id =${product_id}
    GROUP BY characteristic_reviews.characteristic_id, characteristics.name LIMIT 50;`;

  pool.query(qRating, (err, ratings) => {
    if (err) {
      console.log('first ', err);
    } else {
      // console.log(ratings.rows[0].result)
      response.ratings = ratings.rows[0].ratings;
      pool.query(queryRecommend, (err, recommended) => {
        if (err) {
          console.log('second ', err);
        } else {
          response.recommended = recommended.rows[0].recommended;
          pool.query(queryMeta, (err, result) => {
            if (err) {
              console.log('third ', err);
            } else {
              result.rows.forEach((row) => {
                response.char[row.name] = {
                  id: row.id,
                  value: row.value
                }
              });
              callback(null, {
                product_id: response.product_id,
                ratings: response.ratings,
                recommended: response.recommended,
                characteristics: response.char
              })
            }
          })
        }
      })
    }
  })


}

module.exports = {
  revQuery: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  connect: (err, client, done) => {
    return pool.connect(err, client, done);
  },
  getReviews,
  getMeta
};