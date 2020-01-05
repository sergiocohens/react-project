var express = require('express');
var router = express.Router();
const pgp = require('pg-promise')();
const connectString = 'postgres://localhost:5432/holding_db';
const db = pgp(connectString);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
