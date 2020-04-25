'use strict'

const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

function getAll (req, res) {
  User.find()
    .then(users => res.json({ users }))
    .catch(error => res.status(400).json({ error }))
}

function add (req, res) {
  const saltRounds = 10

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    User.find({ email: req.body.email }).then(user => {
      if (user.length !== 0) res.status(406).json({ error: 'Invalid email' })
      else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          settings: "Camera"
        })
        newUser
          .save()
          .then(item => res.json({ item }))
          .catch(error => res.status(400).json({ error }))
      }
    })
  })
}

function login (req, res, next) {
  console.log("got to route controller")
  console.log(req.body)
  console.log("end to route controller")
  return passport.authenticate(
    'login-user',
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        console.log("deu erro")
        console.log(err)
        return next(err)
      }
      console.log("here1")
      if (passportUser) {
        console.log("passportUser")
        console.log(passportUser)
        const reqUser = {
          _id: passportUser._id,
          name: passportUser.name,
          email: passportUser.email,
          username: passportUser.username,
          settings: passportUser.settings,
          photo: passportUser.photo
        }
        req.login(reqUser, error => {
          if (error) {
            console.log("mrdoud")
            console.log("error")
            return res.send({ error })
          }
          console.log("no error")
          return res.json({
            user: passportUser.toAuthJSON()
          })
        })
      } else {
        console.log("sent info")
        return res.status(400).json(info)
      }
    }
  )
}

function get (req, res) {
  User.find({ _id: req.params.id })
    .then(user => {
      res.json({ user })
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

function hashPassword (password) {
  return bcrypt.hashSync(password, 10)
}

function logout (req, res) {
  req.logout()
  return res.status(200).json('Logged out')
}

function getCurrent (req, res) {
  const { payload } = req
  return res.status(200).json({ payload })
}

module.exports = {
  getAll,
  add,
  login,
  logout,
  getCurrent,
  hashPassword,
  get
}
