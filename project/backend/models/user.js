"use strict";

const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');


const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String },
    password: { type: String, required: true },
    photo: { type: String, required: false, default: '' },
    settings: {
        type: String,
        enum: ['Camera', 'Image', 'Quiz'],
        required: true 
      },
  },
);

function jwtSecret() {
  return "secret"; //TODO CHANGE TO BE IN .ENV FILE
}

userSchema.methods = {
  checkPassword(inputPassword) {
    //return bcrypt.compareSync(inputPassword, this.password);
    return inputPassword == this.password;
  },

  generateJWT() {
    return jwt.sign(
      {
        _id: this._id,
        name: this.name,
        email: this.email,
        username: this.username,
        settings: this.settings,
        photo: this.photo,
      },
      jwtSecret(),
    );
  },
  toAuthJSON() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      username: this.username,
      settings: this.settings,
      photo: this.photo,
      token: this.generateJWT(),
    };
  },
};

function setUsername(next) {
  this.username = this.get("email")
  next();
}

userSchema.pre('save', setUsername);

const User = mongoose.model("user", userSchema);
module.exports = User;
