require('newrelic');
const express = require('express');
const compression = require('compression');
const app = express();
module.exports.app = app;
const port = 3000;
const db = require('../database.js');
app.use(compression());
app.use(express.json());
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/reviews', (req, res) => {
  db.getReviews(req.query, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.status(200).send(result);
    }
  })
})

app.get('/reviews/meta', (req, res) => {
  db.getMeta(req.query, (err, result) => {
    if (err) {
      console.log('server meta ', err);
      res.sendStatus(404);
    } else {
      res.status(200).send(result);
    }
  })
})
/*
========================================================
                  RATINGS & REVIEWS
========================================================
*/

// app.get('/reviews', (req, res) => {
//   const product_id = req.query.product_id;
//   const page = req.query.page || 0;
//   const count = req.query.count || 5;
//   const sort = req.query.sort || 'newest';
//   const sortParam = sort === 'newest' ? 'date' : 'helpfulness';
//   // console.log(req.query)
//   const resObj = {
//     product: product_id,
//     page: page,
//     count: count,
//     results: [],
//   };

//   db.revQuery(`
//     SELECT * FROM reviews
//     WHERE product_id = $1
//     AND reported = false
//     ORDER BY $2 DESC;`,
//     [product_id, sortParam])
//     .then(result => {
//       const reviewArr = result.rows.slice(page * count, page * count + count);

//       reviewArr.forEach((review) => {
//         console.log(review)
//         resObj.results.push(
//           {
//             review_id: review.id,
//             rating: review.rating,
//             summary: review.summary,
//             recommend: review.recommend,
//             response: review.response,
//             body: review.body,
//             date: new Date(Number(review.date)).toISOString(),
//             reviewer_name: review.reviewer_name,
//             helpfulness: review.helpfulness,
//             photos: [],
//           }
//         )
//       })
//       res.send(resObj);
//     })
//     .catch(err => {
//       console.log('query err: ', err);
//       res.sendStatus(404);
//     })
// });
