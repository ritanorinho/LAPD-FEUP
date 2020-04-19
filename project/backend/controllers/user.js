"use strict";

const passport = require('passport');
const User = require("../models/user");

function getAll(req, res) {
  User.find()
    .then((users) => res.json({ users }))
    .catch((error) => res.status(400).json({ error }));
}

function add(req, res) {
  User.find({ email: req.body.email }).then((user) => {
    if (user.length !== 0) res.status(406).json({ error: "Invalid email" });
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.email,
      });
      newUser
        .save()
        .then((item) => res.json({ item }))
        .catch((error) => res.status(400).json({ error }));
    }
  });
}

function login(req, res, next) {
  console.log(req.body)
  return passport.authenticate(
    'login-user',
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }
      console.log(info)
      if (passportUser) {
        const reqUser = {
          _id: passportUser._id,
          name: passportUser.name,
          email: passportUser.email,
          username: passportUser.username,
          settings: passportUser.settings,
          photo: passportUser.photo,
        };

        req.login(reqUser, error => {
          if (error) {
            return res.send({ error });
          }
          return res.json({
            user: passportUser.toAuthJSON(),
          });
        });
      } else {
        return res.status(400).json(info);
      }
    },
  )(req, res, next);
}

function logout(req, res) {
  req.logout();
  return res.status(200).json('Logged out');
}

function getCurrent(req, res) {
  const { payload } = req;
  return res.status(200).json({ payload });
}


module.exports = {
  getAll,
  add,
  login,
  logout,
  getCurrent
};
