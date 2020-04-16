"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const emotionSchema = new Schema(
  {
    name: { type: String, required: true },
  },
);

const Emotion = mongoose.model("emotion", emotionSchema);
module.exports = Emotion;
