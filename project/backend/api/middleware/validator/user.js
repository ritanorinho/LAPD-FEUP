"use strict";

const { body } = require("express-validator");

const { checkExpressValidators } = require("../errorHandler");

const userRegister = checkExpressValidators([
  body("name", "Name is required").not().isEmpty(),
  body("email", "Email is required").not().isEmpty(),
  body("password", "Password is required")
    .not()
    .isEmpty()
]);

module.exports = {
  userRegister,
};
