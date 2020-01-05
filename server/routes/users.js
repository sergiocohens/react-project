var express = require('express');
var router = express.Router();
const db = require('./pgExport');


const getAllUsers = async (req, res, next) => {
  try {
    let response = await db.any("SELECT * FROM users;");
    res.json({
      status: "success",
      message: req.get('host') + req.originalUrl,
      body: response
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
}


const addNewUser = async(req,res) =>{
  try {
    let insertQuery = `
  INSERT INTO users(email, img_url)
  VALUES($1, $2);
  `
    await db.none(insertQuery, [req.body.email, req.body.img_url]);
    res.json({
      body: req.body,
      message: `User registration was successful!`
    })
  } catch (error) {
    res.json({
      message: `There was an error!`
    })
  }
}


const getProfilePic = async(req,res) => {
  try {
    let response = await db.any(`SELECT img_url FROM users WHERE id = ${req.params.id}`)
    res.json({
      status: "success",
      message: req.get('host') + req.originalUrl,
      body: response
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
}

router.get("/", getAllUsers); // get all users
router.post("/", addNewUser)
router.get("/:id", getProfilePic)

module.exports = router;
