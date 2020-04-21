'use strict'

const Record = require('../models/record')

function mockData () {
  return [
    new Record({
      userId: '5e9c2f80611a7140e2d61f22',
      date: '2020-04-21'
    }),
    new Record({
        userId: '5e9c2f80611a7140e2d61f22',
        date: '2020-04-19'
      }),
      new Record({
        userId: '5e9c2f80611a7140e2d61f22',
        date: '2020-04-18'
      }),
      new Record({
        userId: '5e9c2f80611a7140e2d61f22',
        date: '2020-04-17'
      }),
      new Record({
        userId: '5e9c2f80611a7140e2d61f22',
        date: '2020-04-16'
      }),
  ]
}

function seedRecord () {
  const records = mockData()
  Record.find({})
    .deleteMany()
    .then(() => {
      Record.create(records, (err) => {
        if (err) {
          console.error(`Error seeding record: ${err}`)
        }
      })
    })
  return { records }
}

module.exports = { seedRecord }
