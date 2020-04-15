"use strict";

const Genre = require("../models/genre");

function mockData(musicId, sportsId, artsId, filmId, miscellaneousId) {
  return [
    new Genre({
      name: "Rock",
      apiId: "KnvZfZ7vAeA",
      categoryId: musicId,
    }),
    new Genre({
      name: "Country",
      apiId: "KnvZfZ7vAv6",
      categoryId: musicId,
    }),
    new Genre({
      name: "Baseball",
      apiId: "KnvZfZ7vAdv",
      categoryId: sportsId,
    }),
    new Genre({
      name: "Theatre",
      apiId: "KnvZfZ7v7l1",
      categoryId: artsId,
    }),
    new Genre({
      name: "Music",
      apiId: "KnvZfZ7vAkJ",
      categoryId: filmId,
    }),
    new Genre({
      name: "Ice Shows",
      apiId: "KnvZfZ7v7lI",
      categoryId: miscellaneousId,
    }),
    new Genre({
      name: "Fairs & Festivals",
      apiId: "KnvZfZ7vAeE",
      categoryId: miscellaneousId,
    }),
  ];
}

function seedGenre(musicId, sportsId, artsId, filmId, miscellaneousId) {
  const genres = mockData(musicId, sportsId, artsId, filmId, miscellaneousId);
  Genre.find({})
    .deleteMany()
    .then(() => {
      Genre.create(genres, (err) => {
        if (err) {
          console.error(`Error seeding genre: ${err}`);
        }
      });
    });
}

module.exports = { seedGenre };
