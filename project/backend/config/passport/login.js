'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

module.exports = function login(passport) {
  console.log("login")
  passport.use(
    'login-user',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        User.findOne({ username })
          .then(user => {
            if (!user) {
              console.log("user not found")
              return done(null, false, {
                param: 'email',
                message: 'Invalid email',
              });
            }
            if (!user.checkPassword(password)) {
              console.log("invalid password")
              return done(null, false, {
                param: 'password',
                message: 'Invalid password',
              });
            }
            console.log("success")
            return done(null, user, { message: 'Sign in succesful' });
          })
          .catch(() => {});
      },
    ),
  );
};
