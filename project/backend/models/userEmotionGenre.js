"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const userEmotionGenreSchema = new Schema(
  {
    userId: { type: String, required: true },
    emotionId: { type: String, required: true },
    genreId: { type: String, required: true },
  },
);

const UserEmotionGenre = mongoose.model("userEmotionGenre", userEmotionGenreSchema);
module.exports = UserEmotionGenre;
