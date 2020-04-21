'use strict'

const Emotion = require('../models/emotion')
const Record = require('../models/record')
const RecordEmotion = require('../models/recordEmotion')
function getAll (req, res) {
  Emotion.find()
    .then(emotions => res.json({ emotions }))
    .catch(error => res.status(400).json({ error }))
}

async function getCurrentEmotion (req, res) {

  let query = { userId: '5e9c2f80611a7140e2d61f22' }
  await Record.find(query)
    .sort({ date: -1 })
    .then(async records => {
      let id = records[0].id
      let query = { recordId: id }
      await RecordEmotion.find(query).then(async emotion => {
        res.json({ emotion })
      })
    })
}
module.exports = {
  getAll,
  getCurrentEmotion
}
