"use strict";

const UEG = require("../models/userEmotionGenre");

function mockData(users, emotions, genres) {
  return [
    new UEG({
      userId: users[0].get("_id"), //jane doe
      emotionId: emotions[0].get("_id"), //anger
      genreId: genres[0].get("_id"), //rock
    }),
    new UEG({
      userId: users[0].get("_id"), //jane doe
      emotionId: emotions[0].get("_id"), //anger
      genreId: genres[2].get("_id"), //baseball
    }),
    new UEG({
      userId: users[0].get("_id"), //jane doe
      emotionId: emotions[1].get("_id"), //fear
      genreId: genres[1].get("_id"), //country
    }),
    new UEG({
      userId: users[0].get("_id"), //jane doe
      emotionId: emotions[1].get("_id"), //fear
      genreId: genres[3].get("_id"), //Theatre
    }),
    new UEG({
      userId: users[0].get("_id"), //jane doe
      emotionId: emotions[2].get("_id"), //happiness
      genreId: genres[1].get("_id"), //country
    }),
    new UEG({
      userId: users[0].get("_id"), //jane doe
      emotionId: emotions[2].get("_id"), //happiness
      genreId: genres[6].get("_id"), //Fairs & Festivals
    }),
    new UEG({
      userId: users[0].get("_id"), //jane doe
      emotionId: emotions[3].get("_id"), //neutral
      genreId: genres[4].get("_id"), //Music
    }),
    new UEG({
      userId: users[0].get("_id"), //jane doe
      emotionId: emotions[4].get("_id"), //sadness
      genreId: genres[4].get("_id"), //Music
    }),

    new UEG({
      userId: users[1].get("_id"), //john doe
      emotionId: emotions[0].get("_id"), //anger
      genreId: genres[0].get("_id"), //rock
    }),
    new UEG({
      userId: users[1].get("_id"), //john doe
      emotionId: emotions[1].get("_id"), //fear
      genreId: genres[1].get("_id"), //country
    }),
    new UEG({
      userId: users[1].get("_id"), //john doe
      emotionId: emotions[2].get("_id"), //happiness
      genreId: genres[3].get("_id"), //Theatre
    }),
    new UEG({
      userId: users[1].get("_id"), //jonh doe
      emotionId: emotions[3].get("_id"), //neutral
      genreId: genres[4].get("_id"), //Music
    }),
    new UEG({
      userId: users[1].get("_id"), //john doe
      emotionId: emotions[4].get("_id"), //sadness
      genreId: genres[4].get("_id"), //Music
    }),
    new UEG({
      userId: users[1].get("_id"), //john doe
      emotionId: emotions[4].get("_id"), //sadness
      genreId: genres[2].get("_id"), //baseball
    }),
  ];
}

function seedUEG(users, emotions, genres) {
  const uegs = mockData(users, emotions, genres);
  UEG.find({})
    .deleteMany()
    .then(() => {
        UEG.create(uegs, (err) => {
        if (err) {
          console.error(`Error seeding userEmotionGenre: ${err}`);
        }
      });
    });
}

module.exports = { seedUEG };
