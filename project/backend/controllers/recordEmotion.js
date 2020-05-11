"use strict";

const Record = require("../models/record");
const RecordEmotion = require("../models/recordEmotion");
const Emotion = require("../models/emotion");

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

async function getResults(req, res) {
  const { payload } = req;
  const { _id } = payload;
  const userId = _id;
  let records = [];

  await Record.find({ userId })
    .sort({ date: -1 })
    .then(async (records) => {
      let id = records[0].id;
      await RecordEmotion.find({ recordId: id }).then(async (recordEms) => {
        for (const recordEm of recordEms) {
          const { emotionId } = { recordEm };
          await Emotion.find({ _id: emotionId }).then(async (e) => {
            const rec = {
              name: e.name,
              percentage: recordEm.percentage
            }
            records.add(rec);
          });
        }
      });
    });
  return res.status(200).json({ records });
}

module.exports = {
  add,
  getResults,
};
