var express = require('express');
var router = express.Router();
const db = require('./pgExport');


/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });



const middleWare = async (req, res, next) => {
  try {
    let response = await db.any("SELECT * FROM users;");
    res.json({
      status: "success",
      message: req.get('host') + req.originalUrl,
      body: response
    });
  } catch (error) {
    log(error);
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    });
  }
}



router.get("/", middleWare); // get all users
module.exports = router;
