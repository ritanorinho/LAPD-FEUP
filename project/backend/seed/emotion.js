"use strict";

const Emotion = require("../models/emotion");

function mockData() {
  return [
    new Emotion({
      name: "anger",
    }),
    new Emotion({
      name: "fear",
    }),
    new Emotion({
      name: "happiness",
    }),
    new Emotion({
      name: "neutral",
    }),
    new Emotion({
      name: "sadness",
    }),
  ];
}

function seedEmotion() {
  const emotions = mockData();
  Emotion.find({})
    .deleteMany()
    .then(() => {
     Emotion.create(emotions, (err) => {
        if (err) {
          console.error(`Error seeding emotion: ${err}`);
        }
      });
    });
}

module.exports = { seedEmotion };
