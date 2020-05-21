"use strict";

const service = require("../services/tm_discovery/getEvents");
const UEG = require("../models/userEmotionGenre");
const Genre = require("../models/genre");
const Category = require("../models/category");
const Record = require("../models/record");
const RecordEmotion = require("../models/recordEmotion");
const Emotion = require("../models/emotion");

async function getSuggestions(req, res) {
  const { payload } = req;
  const { _id } = payload;
  const userId = _id;
  let query = { userId };
  let emotionId;
  let emotionName = "neutral";

  await Record.find(query)
    .sort({ date: -1 })
    .then(async (records) => {
      let id = records[0].id;
      let query = { recordId: id };
      await RecordEmotion.find(query)
        .sort({ percentage: -1 })
        .then(async (emotion) => {
          emotionId = emotion[0].emotionId;
          await Emotion.find({ _id: emotionId }).then(async (e) => {
            emotionName = e[0].name;
          });
        });
    });

  const query2 = { userId, emotionId };
  let suggestions = [];
  let hasPreferences = true;

  await UEG.find(query2)
    .then(async (uegs) => {
      if (uegs.length == 0) hasPreferences = false;
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
      let hasSuggestions = true;
      if (suggestions.length == 0) hasSuggestions = false;
      res.json({ suggestions, emotionName, hasPreferences, hasSuggestions });
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
