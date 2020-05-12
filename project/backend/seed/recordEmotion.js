'use strict'

const RecordEmotion = require('../models/recordEmotion')

function mockData () {
  return [
    new RecordEmotion({
        recordId: '5eb985124ded9f17afac3e31',
        emotionId: '5e9c2f81611a7140e2d61f26',
        percentage: 22,
    }),
    new RecordEmotion({
        recordId: '5eb985124ded9f17afac3e31',
        emotionId: '5e9c2f81611a7140e2d61f24',
        percentage: 24,
    }),
    new RecordEmotion({
        recordId: '5eb985124ded9f17afac3e31',
        emotionId: '5e9c2f81611a7140e2d61f27',
        percentage: 40,
    }),
    new RecordEmotion({
        recordId: '5eb985124ded9f17afac3e31',
        emotionId: '5e9c2f81611a7140e2d61f28',
        percentage: 10,
    }),
    new RecordEmotion({
        recordId: '5eb985124ded9f17afac3e31',
        emotionId: '5e9c2f81611a7140e2d61f25',
        percentage: 4,
    }),
  ]
}

function seedRecordEmotion () {
  const recordEmotions = mockData()
  RecordEmotion.find({})
    .deleteMany()
    .then(() => {
      RecordEmotion.create(recordEmotions, (err) => {
        if (err) {
          console.error(`Error seeding record: ${err}`)
        }
      })
    })
  return { recordEmotions }
}

module.exports = { seedRecordEmotion }
