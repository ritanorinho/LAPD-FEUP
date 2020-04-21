'use strict'

const service = require('../services/tm_discovery/getEvents')
const UEG = require('../models/userEmotionGenre')
const Genre = require('../models/genre')
const Category = require('../models/category')
const Record = require('../models/record')
const RecordEmotion = require('../models/recordEmotion')

async function getSuggestions (req, res) {


  const userId = '5e9c2f80611a7140e2d61f22' //change afte auth
  let query = { userId: userId }
  let emotionId;
  await Record.find(query)
    .sort({ date: -1 })
    .then(async records => {
      let id = records[0].id
      let query = { recordId: id }
      await RecordEmotion.find(query).then(async emotion => {
        emotionId = emotion[0].emotionId;
      })
    })
    const query2 = { userId, emotionId }
  let suggestions = []
  await UEG.find(query)
    .then(async uegs => {
      console.log('UEGS ' + uegs)
      for (const ueg of uegs) {
        await Genre.findById(ueg.genreId).then(async genre => {
          await Category.findById(genre.categoryId).then(async category => {
            const categoryId = category.apiId
            const genreId = genre.apiId
            const apiResponse = await service.getEvents({
              categoryId,
              genreId
            })
            suggestions = suggestions.concat(apiResponse._embedded.events)
          })
          //.catch()
        })
        //.catch()
      }
      res.json({ suggestions })
    })
    .catch(error => res.status(400).json({ error }))
}

async function getDetails (req, res) {
  const { eventId } = req.params
  const details = await service.getEvent({ eventId })
  res.json({ details })
}

module.exports = {
  getSuggestions,
  getDetails
}
