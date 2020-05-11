"use strict";

const Record = require("../models/record");
const RecordEmotion = require("../models/recordEmotion");

function add(req, res) {
  const { body, payload } = req;
  const { emotionId } = body;
  const { _id } = payload;
  const date = new Date();
  const record = new Record({ userId: _id, date });
  record.save();
  const recordEmotion = new RecordEmotion({
    recordId: record._id,
    emotionId,
    percentage: 100,
  });
  recordEmotion
    .save()
    .then((recordEmotion) => res.json({ recordEmotion }))
    .catch((error) => res.status(400).json({ error }));
}

module.exports = {
  add,
};
