"use strict";

const Category = require("../models/category");

function mockData() {
  return [
    new Category({
      name: "music",
      apiId: "KZFzniwnSyZfZ7v7nJ",
    }),
    new Category({
      name: "sports",
      apiId: "KZFzniwnSyZfZ7v7nE",
    }),
    new Category({
      name: "Arts & Theatre",
      apiId: "KZFzniwnSyZfZ7v7na",
    }),
    new Category({
      name: "Film",
      apiId: "KZFzniwnSyZfZ7v7nn",
    }),
    new Category({
      name: "miscellaneous",
      apiId: "KZFzniwnSyZfZ7v7n1",
    }),
  ];
}


function seedCategory() {
  const categories = mockData();
  Category.find({})
    .deleteMany()
    .then(() => {
      Category.create(categories, (err) => {
        if (err) {
          console.error(`Error seeding category: ${err}`);
        }
      });
    });

  return {
    musicId: categories[0].get("_id"),
    sportsId: categories[1].get("_id"),
    artsId: categories[2].get("_id"),
    filmId: categories[3].get("_id"),
    miscellaneousId: categories[4].get("_id"),
  };
}

module.exports = { seedCategory };
