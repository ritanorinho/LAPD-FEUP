"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const genreSchema = new Schema(
  {
    name: { type: String, required: true },
    apiId: { type: String, required: true },
    categoryId: { type: String, required: true },
  },
);

const Genre = mongoose.model("genre", genreSchema);
module.exports = Genre;
