"use strict";

const service = require("../services/tm_discovery/getEvents");
const UEG = require("../models/userEmotionGenre");
const Genre = require("../models/genre");
const Category = require("../models/category");
const Emotion = require("../controllers/emotion")

async function getSuggestions(req, res) {
  const { userId, emotionId } = req.params;
  const query = { userId, emotionId };
  let suggestions = [];
  await UEG.find(query)
    .then(async (uegs) => {
      for (const ueg of uegs) {
        await Genre.findById(ueg.genreId).then(async (genre) => {
          await Category.findById(genre.categoryId).then(async (category) => {
            const categoryId = category.apiId;
            const genreId = genre.apiId;
            const apiResponse = await service.getEvents({
              categoryId,
              genreId,
            });
            suggestions = suggestions.concat(apiResponse._embedded.events);
          });
          //.catch()
        });
        //.catch()
      }
      res.json({ suggestions });
    })
    .catch((error) => res.status(400).json({ error }));
}

async function getDetails(req, res) {
  const { eventId } = req.params;
  const details = await service.getEvent({ eventId });
  res.json({ details });
}

module.exports = {
  getSuggestions,
  getDetails,
};
