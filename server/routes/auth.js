const express = require('express')
const passport = require('passport')
const router = express.Router()
const helpers = require('../helpers')
const usersQueries = require('../database/queries/users')

router.post('/signup', async (req, res, next) => {
  try {
    const passwordDigest = await helpers.hashPassword(req.body.password)
    const userInfo = {
      username: req.body.username,
      password: passwordDigest,
      img_url: "http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png"
    }
    let newUser = await usersQueries.addNewUser(userInfo)
    res.json({
      payload: newUser,
      msg: 'user added',
      err: false
    })
  } catch(err) {
    res
       .status(500)
       .json({
         payload: err,
         msg: 'failed adding user',
         err: true
    })
  }
})

router.post('/login', passport.authenticate('local'),(req,res,next) => {
  res.json({
    payload: req.user,
    msg: 'user logged in',
    err: false
  })
})

router.get('/logout', (req,res,next) => {
  req.logOut()
  res.json({
    payload: null,
    msg: 'user logged out',
    err: false
  })
})

router.get('/isUserLoggedIn', (req,res,next) => {
  res.json({
    payload: req.user,
    msg: 'User is logged in. Session active',
    err: false
  })
})

module.exports = router
