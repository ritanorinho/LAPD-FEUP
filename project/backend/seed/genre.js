"use strict";

const Genre = require("../models/genre");

function mockData(musicId, sportsId, artsId, filmId, miscellaneousId) {
  return [
    //0
    new Genre({
      name: "Rock",
      apiId: "KnvZfZ7vAeA",
      categoryId: musicId,
    }),
    //1
    new Genre({
      name: "Country",
      apiId: "KnvZfZ7vAv6",
      categoryId: musicId,
    }),
    //2
    new Genre({
      name: "Baseball",
      apiId: "KnvZfZ7vAdv",
      categoryId: sportsId,
    }),
    //3
    new Genre({
      name: "Theatre",
      apiId: "KnvZfZ7v7l1",
      categoryId: artsId,
    }),
    //4
    new Genre({
      name: "Music",
      apiId: "KnvZfZ7vAkJ",
      categoryId: filmId,
    }),
    //5
    new Genre({
      name: "Ice Shows",
      apiId: "KnvZfZ7v7lI",
      categoryId: miscellaneousId,
    }),
    //6
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
  return {genres};
}

module.exports = { seedGenre };
