var express = require('express');
var router = express.Router();
const db = require('./pgExport');
const passport = require('passport')
const helpers = require('../helpers')
const usersQueries = require('../database/queries/users')


const getAllUsers = async (req, res, next) => {
  try {
    let response = await db.any("SELECT * FROM users;");
    res.json({
      status: "success",
      body: response
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
}

const getUserEmail = async (req,res) =>{
  let email = req.params.email
  try{
    let response = await helpers.getUserByUsername(username)
    res.json({
      status: "success",
      body: response
    })
  }catch(error){
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
}

const getProfilePic = async(req,res) => {
  let id = req.params.id
  try {
    let response = await db.any(`SELECT img_url FROM users WHERE id = $1`, id)
    res.json({
      status: "success",
      body: response
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
}

const changeProfilePic = async(req,res) => {
  let id = req.params.id
  try {
    await db.none('UPDATE users SET img_url = $1 WHERE id = $2', [req.body.imgUrl, id])
    res.json({
      body: req.body,
      message: 'Profile picture changed!'
    })
  } catch (error) {
    res.json({
      message:'There was an error!'
    })
  }
}

router.get("/", getAllUsers);
router.get("/email/:email", getUserEmail)
router.get("/profilepic/:id", getProfilePic)
router.put("/profilepic/:id", changeProfilePic)

module.exports = router;
