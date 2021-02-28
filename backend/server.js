const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();
app.use(bodyParser.json());

/*
// create table
db.pool.query(`CREATE TABLE lists (
  id INTEGER AUTO_INCREMENT
  value TEXT,
  PRIMARY KEY (id)
)`, (error, results, fields) => {
  console.log('create table results :', results);
});
*/

// api
app.get('/api/values', (req, res) => {
  db.pool.query('SELECT * FROM lists', (error, results, fields) => {
    if (error) {
      return res.status(500).send(error);
    }

    return res.json(results);
  });
});

app.post('/api/value', (req, res, next) => {
  db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (error, results, fields) => {
    if (error) {
      return res.status(500).send(error);
    }

    return res.json({
      isSuccess: true,
      value: req.body.value
    });
  });
});

app.listen(5000, () => {
  console.log('listening on port 5000');
})