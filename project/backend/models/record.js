"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const recordSchema = new Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
  },
);

const Record = mongoose.model("record", recordSchema);
module.exports = Record;
