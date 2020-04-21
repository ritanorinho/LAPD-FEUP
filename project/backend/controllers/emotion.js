'use strict'

const Emotion = require('../models/emotion')
const Record = require('../models/record')
const RecordEmotion = require('../models/recordEmotion')
function getAll (req, res) {
  Emotion.find()
    .then(emotions => res.json({ emotions }))
    .catch(error => res.status(400).json({ error }))
}

async function getCurrentEmotion (userId) {
  let query = { userId: userId } 
  await Record.find(query)
    .sort({ date: -1 })
    .then(async records => {
      let id = records[0].id
      let query = { recordId: id }
      await RecordEmotion.find(query).then(async emotion => {
        return emotion[0].emotionId;
      })
    })
}
module.exports = {
  getAll,
  getCurrentEmotion
}
