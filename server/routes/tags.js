const express = require('express');
const router = express.Router();

const pgp = require('pg-promise')();
const connectString = 'postgres://localhost:5432/holding_db';
const db = pgp(connectString);








module.exports = router;