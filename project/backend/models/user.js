"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, required: false, default: '' },
    settings: {
        type: String,
        enum: ['Camera', 'Image', 'Quiz'],
        required: true 
      },
  },
);

const User = mongoose.model("user", userSchema);
module.exports = User;
