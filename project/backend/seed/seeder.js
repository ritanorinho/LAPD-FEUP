"use strict";

const user = require("./user");
const emotion = require("./emotion");
const category = require("./category");
const genre = require("./genre");
const ueg = require("./userEmotionGenre");

function seedDB() {
  const { users } = user.seedUser();
  const { emotions } = emotion.seedEmotion();
  const {
    musicId,
    sportsId,
    artsId,
    filmId,
    miscellaneousId,
  } = category.seedCategory();
  const { genres } = genre.seedGenre(
    musicId,
    sportsId,
    artsId,
    filmId,
    miscellaneousId
  );
  ueg.seedUEG(users, emotions, genres);
}

module.exports = { seedDB };
