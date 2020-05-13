"use strict";

const { body } = require("express-validator");

const { checkExpressValidators } = require("../errorHandler");

const userRegister = checkExpressValidators([
  body("name", "Name is required").not().isEmpty(),
  body("password", "Password is required")
    .not()
    .isEmpty(),
  body("confirmPassword", "Confirm password should match with password")
    .not()
    .isEmpty()
    .custom((value, { req }) => value === req.body.password),
]);

module.exports = {
  userRegister,
};
