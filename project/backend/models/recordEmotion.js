"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const recordEmotionSchema = new Schema(
  {
    recordId: { type: String, required: true },
    emotionId: { type: String, required: true },
    percentage: { type: Number, required: true },
  },
);

const RecordEmotion = mongoose.model("recordEmotion", recordEmotionSchema);
module.exports = RecordEmotion;
