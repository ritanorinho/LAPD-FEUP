'use strict'

const RecordEmotion = require('../models/recordEmotion')

function mockData () {
  return [
    new RecordEmotion({
        recordId: '5eb985124ded9f17afac3e31',
        emotionId: '5e9c2f81611a7140e2d61f26',
        percentage: 90,
    }),
    new RecordEmotion({
        recordId: '5eb985124ded9f17afac3e31',
        emotionId: '5e9c2f81611a7140e2d61f24',
        percentage: 95,
    }),
    new RecordEmotion({
        recordId: '5eb985124ded9f17afac3e31',
        emotionId: '5e9c2f81611a7140e2d61f27',
        percentage: 97,
    }),
    new RecordEmotion({
        recordId: '5eb985124ded9f17afac3e31',
        emotionId: '5e9c2f81611a7140e2d61f28',
        percentage: 92,
    }),
    new RecordEmotion({
        recordId: '5eb985124ded9f17afac3e31',
        emotionId: '5e9c2f81611a7140e2d61f24',
        percentage: 85,
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
