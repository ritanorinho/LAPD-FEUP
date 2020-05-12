"use strict";

const Record = require("../models/record");
const RecordEmotion = require("../models/recordEmotion");
const Emotion = require('../models/emotion');

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

async function getAllByUser (req, res) {
  const { payload } = req
  const { _id } = payload
  const query = { userId: _id }
  let allEmotions = []
  let emotionName = 'neutral'
  let percentage = 0
  await Record.find(query)
    .sort({ date: -1 })
    .then(async records => {
      let id = records[0]._id
      let date = records[0].date
      await RecordEmotion.find({ recordId: id }).then(async emotions => {
        for (const emotion of emotions) {
          let emotionId = emotion.emotionId
          percentage = emotion.percentage
          await Emotion.find({ _id: emotionId }).then(async e => {
            
            emotionName = e[0].name
            console.log(_id+" "+emotionName);
          })
          allEmotions.push({ name: emotionName, percentage: percentage })
        }
      })
      res.json({ date: date, emotions: allEmotions })
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}


module.exports = {
  add,
  getAllByUser
}

