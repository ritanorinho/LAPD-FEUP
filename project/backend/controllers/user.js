'use strict'

const User = require('../models/user')

function getAll (req, res) {
 
  User.find()
    .then(users => res.json({ users }))
    .catch(error => res.status(400).json({ error }))
}

function add (req, res) {
  User.find({ email: req.body.email }).then(user => {
    if (user.length !== 0) res.status(406).json({ error: 'Invalid email' })
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.email
      })
      newUser
        .save()
        .then(item => res.json({ item }))
        .catch(error => res.status(400).json({ error }))
    }
  })
}

function get (req, res) {
  User.find({ _id: req.params.id })
  .then(user => {res.json({ user })})
  .catch(error => {res.status(400).json({ error })})
}

module.exports = {
  getAll,
  add,
  get
}
